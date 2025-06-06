import { StorageAccountFileManagerBase64, StorageAccountFileManagerFile, StorageAccountFileManagerFileInput, StorageAccountFileManagerFileUploadedInput } from '@api/graphql';

export abstract class StorageAccountFileManagerService
{
    abstract copy(src: StorageAccountFileManagerFileInput, dest: StorageAccountFileManagerFileInput): void | Promise<void>;
    abstract getBase64File(filePayload: StorageAccountFileManagerFileInput): StorageAccountFileManagerBase64 | Promise<StorageAccountFileManagerBase64>;
    abstract getBase64Files(filePayloads: StorageAccountFileManagerFileInput[]): StorageAccountFileManagerBase64[] |Promise<StorageAccountFileManagerBase64[]>;
    abstract uploadFile(filePayload: StorageAccountFileManagerFileUploadedInput): Promise<StorageAccountFileManagerFile>;
    abstract uploadFiles(filePayloads: StorageAccountFileManagerFileUploadedInput[]):  Promise<StorageAccountFileManagerFile[]>;
}
