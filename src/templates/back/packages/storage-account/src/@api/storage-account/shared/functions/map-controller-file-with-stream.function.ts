import { StorageAccountFileManagerFileUploadedInput } from '@api/graphql';
import { Readable } from 'stream';

export const mapControllerFileWithStream = (
  file: StorageAccountFileManagerFileUploadedInput,
  binary: Express.Multer.File,
): StorageAccountFileManagerFileUploadedInput => {
  if (!file) return file;

  return {
    ...file,
    file: {
      filename: binary.originalname,
      mimetype: binary.mimetype,
      encoding: binary.encoding,
      stream: Readable.from(binary.buffer), // NodeJS.ReadableStream
    },
  };
};
