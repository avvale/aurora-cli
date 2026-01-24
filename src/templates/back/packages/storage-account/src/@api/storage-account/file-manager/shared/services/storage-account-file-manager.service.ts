import {
  StorageAccountFileManagerBase64,
  StorageAccountFileManagerFile,
  StorageAccountFileManagerFileInput,
  StorageAccountFileManagerFileUploadedInput,
} from '@api/graphql';

export abstract class StorageAccountFileManagerService {
  abstract copy(
    src: StorageAccountFileManagerFileInput,
    dest: StorageAccountFileManagerFileInput,
  ): void | Promise<void>;

  abstract deleteFile(
    filePayload: StorageAccountFileManagerFileInput,
  ): void | Promise<void>;

  abstract getBase64File(
    filePayload: StorageAccountFileManagerFileInput,
  ): StorageAccountFileManagerBase64 | Promise<StorageAccountFileManagerBase64>;

  abstract getBase64Files(
    filePayloads: StorageAccountFileManagerFileInput[],
  ):
    | StorageAccountFileManagerBase64[]
    | Promise<StorageAccountFileManagerBase64[]>;

  abstract getStreamFile(
    filePayload: StorageAccountFileManagerFileInput,
  ): NodeJS.ReadableStream | Promise<NodeJS.ReadableStream>;

  abstract getNextAvailableFilename(
    containerName: string,
    basePathSegments: string[],
    filename: string,
  ): Promise<string>;

  abstract getNextAvailableFoldername(
    containerName: string,
    basePathSegments: string[],
    rootFolderPath: string,
  ): Promise<string>;

  abstract uploadFile(
    filePayload: StorageAccountFileManagerFileUploadedInput,
    props?: { filenameFormat?: 'uuid' | 'filename' },
  ): Promise<StorageAccountFileManagerFile>;

  abstract uploadFiles(
    filePayloads: StorageAccountFileManagerFileUploadedInput[],
    props?: { filenameFormat?: 'uuid' | 'filename' },
  ): Promise<StorageAccountFileManagerFile[]>;
}
