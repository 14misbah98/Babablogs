import { createWorker, PSM } from 'tesseract.js';
import path from 'path';
import os from 'os';

export async function extractText(fileBuffer: Buffer, mimeType: string, lang: string = 'eng'): Promise<string> {
  const worker = await createWorker(lang, 1, {
    cachePath: os.tmpdir(),
    errorHandler: (err) => console.error('Tesseract Error:', err),
  });
  
  try {
    // Configure Tesseract to perform Automatic Page Segmentation with OSD
    // This is crucial for multi-column layouts like newspapers so it doesn't read across columns
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.AUTO_OSD,
    });
    
    const { data: { text } } = await worker.recognize(fileBuffer);
    return text;
  } catch (error) {
    console.error(`OCR Error (${lang}):`, error);
    return '';
  } finally {
    await worker.terminate();
  }
}

