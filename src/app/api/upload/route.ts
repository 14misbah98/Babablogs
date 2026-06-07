import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { addContent, getUploadsStore } from '@/lib/storage';
import { ContentMetadata, ContentType } from '@/lib/types';
import { isAuthenticated } from '@/lib/auth';



export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    let file: File | null = null;
    let title = '';
    let author = '';
    let language = '';
    let contentType: ContentType = 'pdf';
    let publishDate = '';
    let tags: string[] = [];

    try {
      const formData = await req.formData();
      file = formData.get('file') as File;
      title = formData.get('title') as string;
      author = formData.get('author') as string;
      language = formData.get('language') as string;
      contentType = formData.get('contentType') as ContentType;
      publishDate = formData.get('publishDate') as string;
      tags = (formData.get('tags') as string || '').split(',').map(t => t.trim());
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return NextResponse.json({ error: 'Failed parsing formData: ' + msg }, { status: 500 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const id = uuidv4();
    let bytes: ArrayBuffer;
    let buffer: Buffer;
    
    try {
      bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return NextResponse.json({ error: 'Failed converting file: ' + msg }, { status: 500 });
    }

    // Get file extension
    const fileNameParts = file.name.split('.');
    const ext = fileNameParts.length > 1 ? `.${fileNameParts.pop()}` : '';
    const fileName = `${id}${ext}`;
    const subfolder = contentType === 'pdf' ? 'pdfs' : contentType === 'image' ? 'images' : 'text';
    const filePath = `uploads/${subfolder}/${fileName}`;

    // Save the file to Netlify Blobs
    try {
      const store = getUploadsStore();
      await store.set(filePath, bytes, {
        metadata: {
          contentType: file.type,
          originalName: file.name
        }
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return NextResponse.json({ error: 'Failed saving to Netlify Blobs: ' + msg }, { status: 500 });
    }

    // For plain text files, extract text directly. For images/PDFs, OCR is done manually in the browser.
    let extractedText = '';
    if (contentType === 'text') {
      extractedText = buffer.toString('utf-8');
    }

    const metadata: ContentMetadata = {
      id,
      title,
      author,
      language,
      contentType,
      publishDate,
      tags,
      fileName,
      filePath,
      extractedText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await addContent(metadata);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return NextResponse.json({ error: 'Failed saving metadata: ' + msg }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: metadata });
  } catch (error: unknown) {
    console.error('Upload Error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Internal Server Error: ' + msg }, { status: 500 });
  }
}


