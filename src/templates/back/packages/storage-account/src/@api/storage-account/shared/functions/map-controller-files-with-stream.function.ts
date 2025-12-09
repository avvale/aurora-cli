import { StorageAccountFileManagerFileUploadedInput } from '@api/graphql';
import { Readable } from 'stream';

export const mapControllerFilesWithStream = (
    files: StorageAccountFileManagerFileUploadedInput[],
    binaries: Express.Multer.File[],
): StorageAccountFileManagerFileUploadedInput[] => {
    if (!Array.isArray(files)) return files;

    return files.map((file, index) => ({
        ...file,
        file: {
            filename: binaries[index].originalname,
            mimetype: binaries[index].mimetype,
            encoding: binaries[index].encoding,
            stream: Readable.from(binaries[index].buffer), // NodeJS.ReadableStream
        },
    }));
};
