import { createWorker, PSM } from 'tesseract.js';
import path from 'path';
import os from 'os';

export async function extractText(fileBuffer: Buffer, mimeType: string, lang: string = 'eng'): Promise<string> {
  return Promise.race([
    new Promise<string>(async (resolve, reject) => {
      let worker;
      try {
        worker = await createWorker(lang, 1, {
          cachePath: os.tmpdir(),
          errorHandler: (err) => console.error('Tesseract Error:', err),
        });
        
        await worker.setParameters({
          tessedit_pageseg_mode: PSM.AUTO_OSD,
        });
        
        const { data: { text } } = await worker.recognize(fileBuffer);
        resolve(text);
      } catch (error) {
        console.error(`OCR Error (${lang}):`, error);
        resolve(''); // Resolve with empty string instead of rejecting to gracefully fail
      } finally {
        if (worker) {
          await worker.terminate().catch(() => {});
        }
      }
    }),
    new Promise<string>((_, reject) => 
      setTimeout(() => reject(new Error('OCR Timeout: Tesseract took too long to respond')), 8000)
    )
  ]).catch((err) => {
    console.error(err.message);
    return ''; // Return empty string on timeout so upload continues
  });
}

