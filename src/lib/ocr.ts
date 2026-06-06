import { createWorker, PSM } from 'tesseract.js';
import path from 'path';
import os from 'os';

export async function extractText(fileBuffer: Buffer, mimeType: string, lang: string = 'eng'): Promise<string> {
  console.log('Skipping Tesseract OCR because it crashes Netlify Serverless functions (502 Bad Gateway).');
  return 'OCR disabled due to server limits.';
}

