import { createWorker } from 'tesseract.js';
import path from 'path';

export async function extractText(fileBuffer: Buffer, mimeType: string, lang: string = 'eng'): Promise<string> {
  const worker = await createWorker(lang, 1, {
    langPath: process.cwd(),
  });
  
  try {
    const { data: { text } } = await worker.recognize(fileBuffer);
    return text;
  } catch (error) {
    console.error(`OCR Error (${lang}):`, error);
    return '';
  } finally {
    await worker.terminate();
  }
}

