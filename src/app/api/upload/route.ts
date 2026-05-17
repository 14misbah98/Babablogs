import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getStore } from '@netlify/blobs';
import { addContent } from '@/lib/storage';
import { extractText } from '@/lib/ocr';
import { ContentMetadata, ContentType } from '@/lib/types';
import { isAuthenticated } from '@/lib/auth';

const LANG_MAP: { [key: string]: string } = {
  'English': 'eng',
  'Urdu': 'urd',
  'Hindi': 'hin',
  'Marathi': 'mar'
};

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const language = formData.get('language') as string;
    const contentType = formData.get('contentType') as ContentType;
    const publishDate = formData.get('publishDate') as string;
    const tags = (formData.get('tags') as string || '').split(',').map(t => t.trim());

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const id = uuidv4();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get file extension
    const fileNameParts = file.name.split('.');
    const ext = fileNameParts.length > 1 ? `.${fileNameParts.pop()}` : '';
    const fileName = `${id}${ext}`;
    const subfolder = contentType === 'pdf' ? 'pdfs' : contentType === 'image' ? 'images' : 'text';
    const filePath = `uploads/${subfolder}/${fileName}`;

    // Save the file to Netlify Blobs
    const store = getStore('uploads');
    await store.set(filePath, bytes, {
      metadata: {
        contentType: file.type,
        originalName: file.name
      }
    });

    // Perform OCR
    let extractedText = '';
    const ocrLang = LANG_MAP[language] || 'eng';
    
    try {
      if (contentType === 'image' || contentType === 'pdf') {
        extractedText = await extractText(buffer, file.type, ocrLang);
      } else if (contentType === 'text') {
        extractedText = buffer.toString('utf-8');
      }
    } catch (ocrError) {
      console.error('OCR Error:', ocrError);
      // Continue even if OCR fails
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

    await addContent(metadata);

    return NextResponse.json({ success: true, data: metadata });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


