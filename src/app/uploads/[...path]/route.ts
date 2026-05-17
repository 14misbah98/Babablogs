import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const filePath = `uploads/${resolvedParams.path.join('/')}`;
  
  const store = getStore('uploads');
  const blob = await store.get(filePath, { type: 'blob' });

  if (!blob) {
    return new NextResponse('File not found', { status: 404 });
  }

  // Get content type from extension if not available in metadata
  const ext = filePath.split('.').pop()?.toLowerCase();
  const contentTypes: { [key: string]: string } = {
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'txt': 'text/plain',
  };

  const contentType = contentTypes[ext || ''] || 'application/octet-stream';

  return new NextResponse(blob, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

