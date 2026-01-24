import { StorageAccountFileManagerFileUploadedInput } from '@api/graphql';

export const mapResolverFileWithStream = async (
  file: StorageAccountFileManagerFileUploadedInput,
): Promise<StorageAccountFileManagerFileUploadedInput> => {
  if (!file) return file;

  const upload = await file.file;
  const stream = upload.createReadStream();

  return {
    ...file,
    file: {
      filename: upload.filename,
      mimetype: upload.mimetype,
      encoding: upload.encoding,
      stream, // NodeJS.ReadableStream
    },
  };
};
