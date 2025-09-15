/* eslint-disable max-len */
import { StorageAccountFileManagerBase64, StorageAccountFileManagerFile, StorageAccountFileManagerFileInput, StorageAccountFileManagerFileUploadedInput } from '@api/graphql';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import { getRelativePathSegments, streamToBuffer, uuid } from '@aurorajs.dev/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname } from 'node:path';
import { Readable } from 'node:stream';
import * as sharp from 'sharp';

@Injectable()
export class StorageAccountAzureFileManagerService implements StorageAccountFileManagerService
{
    private readonly blobServiceClient: BlobServiceClient;
    private readonly containerName: string;

    constructor(
        private readonly configService: ConfigService,
    )
    {
        const connectionString = configService.get<string>('AZURE_STORAGE_ACCOUNT_CONNECTION_STRING');
        this.containerName = configService.get<string>('AZURE_STORAGE_ACCOUNT_CONTAINER_NAME');

        if (!connectionString) throw new BadRequestException('Azure Storage connection string is not defined in the configuration, please set it in the environment variables AZURE_STORAGE_ACCOUNT_CONNECTION_STRING value.');

        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    }

    async copy(
        src: StorageAccountFileManagerFileInput,
        dest: StorageAccountFileManagerFileInput,
    ): Promise<void>
    {
        if (src.containerName !== dest.containerName)
            throw new BadRequestException(`The names of the source and destination containers must be the same, src: ${src.containerName} dest: ${dest.containerName}`);

        // get container name from file or use default
        const containerName = this.containerName || src.containerName || 'default';

        const containerClient = this.blobServiceClient.getContainerClient(containerName);

        const srcBlobPath = [...src.relativePathSegments, src.filename].join('/');
        const destBlobPath = [...dest.relativePathSegments, dest.filename].join('/');

        const srcBlobClient = containerClient.getBlobClient(srcBlobPath);
        const destBlobClient = containerClient.getBlobClient(destBlobPath);

        const copyPoller = await destBlobClient.beginCopyFromURL(srcBlobClient.url);
        await copyPoller.pollUntilDone();
    }

    async getBase64File(
        filePayload: StorageAccountFileManagerFileInput,
    ): Promise<StorageAccountFileManagerBase64>
    {
        // get container name from file or use default
        const containerName = this.containerName || filePayload.containerName || 'default';

        const containerClient = this.blobServiceClient.getContainerClient(containerName);

        const blobPath = [...filePayload.relativePathSegments, filePayload.filename].join('/');

        const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

        const downloadBlockBlobResponse = await blockBlobClient.download();

        const chunks: Buffer[] = [];
        for await (const chunk of downloadBlockBlobResponse.readableStreamBody)
        {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }

        const buffer = Buffer.concat(chunks);

        return {
            base64: buffer.toString('base64'),
        };
    }

    async getBase64Files(
        filePayloads: StorageAccountFileManagerFileInput[],
    ): Promise<StorageAccountFileManagerBase64[]>
    {
        const responses = [];
        for (const filePayload of filePayloads)
        {
            responses.push(this.getBase64File(filePayload));
        }

        return await Promise.all(responses);
    }

    async uploadFile(
        filePayload: StorageAccountFileManagerFileUploadedInput,
    ): Promise<StorageAccountFileManagerFile>
    {
        // by default all files are saved in the tmp folder, so that after manipulation they are saved in the corresponding folder
        // if it is not necessary to manipulate the file, it can be saved directly in the corresponding folder.
        const relativePathSegments = getRelativePathSegments(filePayload.relativePathSegments);

        // get container name from file or use default
        const containerName = this.containerName || filePayload.containerName || 'default';

        // eslint-disable-next-line no-await-in-loop
        const { createReadStream, filename: originFilename, mimetype, encoding } = await filePayload.file;
        const extensionFile = extname(originFilename).toLowerCase() === '.jpeg' ? '.jpg' : extname(originFilename).toLowerCase();
        const filename = `${filePayload.id}${extensionFile}`;

        const filenamePath = [...relativePathSegments, filename].join('/');

        const containerClient = this.blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(filenamePath);

        const buffer = await streamToBuffer(createReadStream());
        const streamForUpload = Readable.from(buffer);

        await blockBlobClient.uploadStream(
            streamForUpload,
            buffer.length, // bufferSize
            5, // max concurrency
            {
                blobHTTPHeaders:
                {
                    blobContentType: filePayload.file.mimetype,
                },
            },
        );

        // check if file can do a crop action
        const isCropable = mimetype === 'image/jpeg' || mimetype === 'image/png' || mimetype === 'image/gif' || mimetype === 'image/webp';
        const fileMeta = isCropable ? await sharp(buffer).metadata() : undefined;

        const storageAccountFile: StorageAccountFileManagerFile = {
            id        : filePayload.id,
            originFilename,
            filename,
            mimetype,
            extension : extensionFile,
            relativePathSegments,
            width     : fileMeta?.width,
            height    : fileMeta?.height,
            size      : buffer.length,
            url       : blockBlobClient.url,
            isCropable,
            isUploaded: true,
            meta      : {
                fileMeta,
            },
        };

        // add cropable properties
        if (isCropable && filePayload.hasCreateLibrary)
        {
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
                id                  : libraryId,
                originFilename,
                filename,
                mimetype,
                extension           : extensionFile,
                relativePathSegments: storageAccountFile.relativePathSegments,
                width               : storageAccountFile.meta.fileMeta.width,
                height              : storageAccountFile.meta.fileMeta.height,
                size                : storageAccountFile.size,
                url,
                meta                : {
                    fileMeta: storageAccountFile.meta.fileMeta,
                },
            };
        }

        return storageAccountFile;
    }

    async uploadFiles(
        filePayloads: StorageAccountFileManagerFileUploadedInput[],
    ): Promise<StorageAccountFileManagerFile[]>
    {
        const responses = [];
        for (const filePayload of filePayloads)
        {
            const savedFile = this.uploadFile(filePayload);
            responses.push(savedFile);
        }
        return Promise.all(responses);
    }
}
