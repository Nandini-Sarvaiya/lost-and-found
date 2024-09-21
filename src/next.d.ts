// types/next.d.ts
import { NextApiRequest } from 'next';
import { Multer } from 'multer';

declare module 'next' {
  interface NextApiRequest {
    file: Express.Multer.File; // This adds the 'file' property to the NextApiRequest type
  }
}
