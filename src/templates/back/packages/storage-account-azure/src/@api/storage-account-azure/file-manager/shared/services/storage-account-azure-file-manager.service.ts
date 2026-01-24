/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import {
  StorageAccountFileManagerBase64,
  StorageAccountFileManagerFile,
  StorageAccountFileManagerFileInput,
  StorageAccountFileManagerFileUploadedInput,
} from '@api/graphql';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import {
  getFileExtension,
  getFilenameWithoutExtension,
} from '@api/storage-account/shared';
import { Fs, getRelativePathSegments, uuid } from '@aurorajs.dev/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageAccountAzureFileManagerService
  implements StorageAccountFileManagerService
{
  private readonly blobServiceClient: BlobServiceClient;
  private readonly containerName: string;

  constructor(private readonly configService: ConfigService) {
    const connectionString = configService.get<string>(
      'AZURE_STORAGE_ACCOUNT_CONNECTION_STRING',
    );
    this.containerName = configService.get<string>(
      'AZURE_STORAGE_ACCOUNT_CONTAINER_NAME',
    );

    if (!connectionString)
      throw new BadRequestException(
        'Azure Storage connection string is not defined in the configuration, please set it in the environment variables AZURE_STORAGE_ACCOUNT_CONNECTION_STRING value.',
      );

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
  }

  async copy(
    src: StorageAccountFileManagerFileInput,
    dest: StorageAccountFileManagerFileInput,
  ): Promise<void> {
    if (src.containerName !== dest.containerName)
      throw new BadRequestException(
        `The names of the source and destination containers must be the same, src: ${src.containerName} dest: ${dest.containerName}`,
      );

    // get container name from file or use default
    const containerName = src.containerName || this.containerName || 'default';

    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);

    const srcBlobPath = [...src.relativePathSegments, src.filename].join('/');
    const destBlobPath = [...dest.relativePathSegments, dest.filename].join(
      '/',
    );

    const srcBlobClient = containerClient.getBlobClient(srcBlobPath);
    const destBlobClient = containerClient.getBlobClient(destBlobPath);

    const copyPoller = await destBlobClient.beginCopyFromURL(srcBlobClient.url);
    await copyPoller.pollUntilDone();
  }

  async deleteFile(
    filePayload: StorageAccountFileManagerFileInput,
  ): Promise<void> {
    // get container name from file or use default
    const containerName =
      filePayload.containerName || this.containerName || 'default';

    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blobPath = Fs.storagePublicRelativeURL(
      filePayload.relativePathSegments,
      filePayload.filename,
    );

    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);
    await blockBlobClient.deleteIfExists();
  }

  async getBase64File(
    filePayload: StorageAccountFileManagerFileInput,
  ): Promise<StorageAccountFileManagerBase64> {
    // get container name from file or use default
    const containerName =
      filePayload.containerName || this.containerName || 'default';

    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);

    const blobPath = [
      ...filePayload.relativePathSegments,
      filePayload.filename,
    ].join('/');

    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

    const downloadBlockBlobResponse = await blockBlobClient.download();

    const chunks: Buffer[] = [];
    for await (const chunk of downloadBlockBlobResponse.readableStreamBody) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    const buffer = Buffer.concat(chunks);

    return {
      base64: buffer.toString('base64'),
    };
  }

  async getBase64Files(
    filePayloads: StorageAccountFileManagerFileInput[],
  ): Promise<StorageAccountFileManagerBase64[]> {
    const responses = [];
    for (const filePayload of filePayloads) {
      responses.push(this.getBase64File(filePayload));
    }

    return await Promise.all(responses);
  }

  async getStreamFile(
    filePayload: StorageAccountFileManagerFileInput,
  ): Promise<NodeJS.ReadableStream> {
    if (!filePayload.filename)
      throw new BadRequestException('Filename to create blob must be defined');
    if (!Array.isArray(filePayload.relativePathSegments))
      throw new BadRequestException(
        'RelativePathSegments to create blob must be defined and must be an array, current value: ' +
          JSON.stringify(filePayload.relativePathSegments),
      );

    // get container name from file or use default
    const containerName =
      filePayload.containerName || this.containerName || 'default';

    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);

    const blobPath = [
      ...filePayload.relativePathSegments,
      filePayload.filename,
    ].join('/');

    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

    const downloadBlockBlobResponse = await blockBlobClient.download();

    if (!downloadBlockBlobResponse.readableStreamBody)
      throw new BadRequestException(
        'Not found attachment stream for ' + blobPath,
      );

    return downloadBlockBlobResponse.readableStreamBody;
  }

  async getNextAvailableFilename(
    containerName: string,
    basePathSegments: string[],
    filename: string,
  ): Promise<string> {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const extensionFile = getFileExtension(filename);
    const filenameWithoutExtension = getFilenameWithoutExtension(filename);

    let fileIndex = 1;
    let nextAvailableFile = filenameWithoutExtension;

    while (true) {
      const fileSegments = [...basePathSegments, nextAvailableFile];
      const filePrefix = fileSegments.join('/');

      const allBlobs = containerClient.listBlobsFlat({
        prefix: filePrefix,
      });
      const exists = !(await allBlobs.next()).done;

      if (!exists) break;

      nextAvailableFile = `${filenameWithoutExtension}-${fileIndex}${extensionFile}`;
      fileIndex++;
    }

    return nextAvailableFile;
  }

  async getNextAvailableFoldername(
    containerName: string,
    basePathSegments: string[],
    rootFolderSegment: string,
  ): Promise<string> {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);

    let folderIndex = 1;
    let nextAvailableFolder = rootFolderSegment;

    while (true) {
      const folderSegments = [...basePathSegments, nextAvailableFolder];
      const folderPrefix = folderSegments.join('/') + '/';

      const allBlobs = containerClient.listBlobsByHierarchy('/', {
        prefix: folderPrefix,
      });
      const exists = !(await allBlobs.next()).done;

      if (!exists) break;

      nextAvailableFolder = `${rootFolderSegment}-${folderIndex}`;
      folderIndex++;
    }

    return nextAvailableFolder;
  }

  async uploadFile(
    filePayload: StorageAccountFileManagerFileUploadedInput,
    { filenameFormat = 'uuid' }: { filenameFormat?: 'uuid' | 'filename' } = {},
  ): Promise<StorageAccountFileManagerFile> {
    // by default all files are saved in the tmp folder, so that after manipulation they are saved in the corresponding folder
    // if it is not necessary to manipulate the file, it can be saved directly in the corresponding folder.
    const relativePathSegments = getRelativePathSegments(
      filePayload.relativePathSegments,
    );

    // get container name from file or use default
    const containerName =
      filePayload.containerName || this.containerName || 'default';

    const { stream, filename: originFilename, mimetype } = filePayload.file;

    const extensionFile = getFileExtension(originFilename);

    const filenameWithoutExtension =
      filenameFormat === 'uuid'
        ? filePayload.id
        : getFilenameWithoutExtension(originFilename);

    const filename = `${filenameWithoutExtension}${extensionFile}`;
    const absolutePath = [...relativePathSegments, filename].join('/');

    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(absolutePath);

    await blockBlobClient.uploadStream(
      stream,
      4 * 1024 * 1024, // 4MB, // bufferSize
      5, // max concurrency
      {
        blobHTTPHeaders: {
          blobContentType: mimetype,
        },
      },
    );

    // check if file can do a crop action
    const isCropable =
      mimetype === 'image/jpeg' ||
      mimetype === 'image/png' ||
      mimetype === 'image/gif' ||
      mimetype === 'image/webp';

    const sanitizedUrl = blockBlobClient.url.split('?')[0];

    const storageAccountFile: StorageAccountFileManagerFile = {
      id: filePayload.id,
      originFilename,
      filename,
      containerName: containerName,
      mimetype,
      extension: extensionFile,
      relativePathSegments,
      size: filePayload.size,
      url: sanitizedUrl,
      isCropable,
      isUploaded: true,
      meta: {},
    };

    // add cropable properties
    if (isCropable && filePayload.hasCreateLibrary) {
      const libraryId = uuid();
      const filename = `${libraryId}${storageAccountFile.extension}`;
      storageAccountFile.libraryId = libraryId;
      storageAccountFile.libraryFilename = filename;

      const url = await this.copy(
        {
          filename: storageAccountFile.filename,
          relativePathSegments,
          containerName,
        },
        {
          filename,
          relativePathSegments,
          containerName,
        },
      );

      // set storageAccountFile properties from cropable file
      storageAccountFile.width = storageAccountFile.meta.fileMeta.width;
      storageAccountFile.height = storageAccountFile.meta.fileMeta.height;
      storageAccountFile.library = {
        id: libraryId,
        originFilename,
        filename,
        mimetype,
        extension: extensionFile,
        relativePathSegments: storageAccountFile.relativePathSegments,
        width: storageAccountFile.meta.fileMeta.width,
        height: storageAccountFile.meta.fileMeta.height,
        size: storageAccountFile.size,
        url,
        meta: {
          fileMeta: storageAccountFile.meta.fileMeta,
        },
      };
    }

    return storageAccountFile;
  }

  async uploadFiles(
    filePayloads: StorageAccountFileManagerFileUploadedInput[],
    { filenameFormat = 'uuid' }: { filenameFormat?: 'uuid' | 'filename' } = {},
  ): Promise<StorageAccountFileManagerFile[]> {
    const responses = [];
    for (const filePayload of filePayloads) {
      const savedFile = this.uploadFile(filePayload, { filenameFormat });
      responses.push(savedFile);
    }
    return Promise.all(responses);
  }
}
