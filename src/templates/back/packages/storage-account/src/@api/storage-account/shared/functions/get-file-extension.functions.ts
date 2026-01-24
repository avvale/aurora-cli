import { extname } from 'node:path';

export const getFileExtension = (originFilename: string): string => {
  return extname(originFilename).toLowerCase() === '.jpeg'
    ? '.jpg'
    : extname(originFilename).toLowerCase();
};
