import { StorageAccountFileManagerFileUploadedInput } from '@api/graphql';

export const mapResolverFilesWithStream = async (
    files: StorageAccountFileManagerFileUploadedInput[],
): Promise<StorageAccountFileManagerFileUploadedInput[]> => {
    return Promise.all(
        files.map(async (f) => {
            const upload = await f.file;
            const stream = upload.createReadStream();

            return {
                ...f,
                file: {
                    filename: upload.filename,
                    mimetype: upload.mimetype,
                    encoding: upload.encoding,
                    stream, // NodeJS.ReadableStream
                },
            };
        }),
    );
};
