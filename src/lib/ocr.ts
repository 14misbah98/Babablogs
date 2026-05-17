import { createWorker } from 'tesseract.js';

export async function extractText(fileBuffer: Buffer, mimeType: string, lang: string = 'eng'): Promise<string> {
  const worker = await createWorker(lang);
  
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

