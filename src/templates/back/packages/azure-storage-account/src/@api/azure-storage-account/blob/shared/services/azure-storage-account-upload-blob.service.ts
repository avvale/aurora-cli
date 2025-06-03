/* eslint-disable max-len */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { CoreFile, CoreFileUploaded } from '@api/graphql';
import { getRelativePathSegments, streamToBuffer, uuid } from '@aurorajs.dev/core';
import { extname } from 'node:path';
import { Readable } from 'node:stream';
import * as sharp from 'sharp';
import { AzureStorageAccountCopyBlobService } from './azure-storage-account-copy-blob.service';

@Injectable()
export class AzureStorageAccountUploadBlobService
{
    private readonly blobServiceClient: BlobServiceClient;

    constructor(
        private readonly configService: ConfigService,
        private readonly azureStorageAccountCopyBlobService: AzureStorageAccountCopyBlobService,
    )
    {
        const connectionString = configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');

        if (!connectionString) throw new BadRequestException('Azure Storage connection string is not defined in the configuration, please set it in the environment variables AZURE_STORAGE_CONNECTION_STRING value.');

        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    }

    async uploadFile(
        filePayload: CoreFileUploaded,
    ): Promise<CoreFile>
    {
        // by default all files are saved in the tmp folder, so that after manipulation they are saved in the corresponding folder
        // if it is not necessary to manipulate the file, it can be saved directly in the corresponding folder.
        const relativePathSegments = getRelativePathSegments(filePayload.relativePathSegments);

        // get container name from file or use default
        const containerName = filePayload.containerName || 'default';

        // eslint-disable-next-line no-await-in-loop
        const { createReadStream, filename: originFilename, mimetype, encoding } = await filePayload.file;
        const extensionFile = extname(originFilename).toLowerCase() === '.jpeg' ? '.jpg' : extname(originFilename).toLowerCase();
        const blobName = `${filePayload.id}${extensionFile}`;

        const blobPath = [...relativePathSegments, blobName].join('/');

        const containerClient = this.blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

        const buffer = await streamToBuffer(createReadStream());
        const streamForUpload = Readable.from(buffer);

        const uploadResponse = await blockBlobClient.uploadStream(
            streamForUpload,
            filePayload.file.size, // bufferSize
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

        const coreFile: CoreFile = {
            id        : filePayload.id,
            originFilename,
            filename  : blobName,
            mimetype,
            extension : extensionFile,
            relativePathSegments,
            width     : fileMeta?.width,
            height    : fileMeta?.height,
            size      : filePayload.file.size,
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
            const blobName = `${libraryId}${coreFile.extension}`;
            coreFile.libraryId = libraryId;
            coreFile.libraryFilename = blobName;
            const libraryBlobPath = [...relativePathSegments, blobName].join('/');

            const url = await this.azureStorageAccountCopyBlobService.copyBlob(
                blobPath,
                libraryBlobPath,
                containerName,
            );

            // set coreFile properties from cropable file
            coreFile.width = coreFile.meta.fileMeta.width;
            coreFile.height = coreFile.meta.fileMeta.height;
            coreFile.library = {
                id                  : libraryId,
                originFilename,
                filename            : blobName,
                mimetype,
                extension           : extensionFile,
                relativePathSegments: coreFile.relativePathSegments,
                width               : coreFile.meta.fileMeta.width,
                height              : coreFile.meta.fileMeta.height,
                size                : coreFile.size,
                url,
                meta                : {
                    fileMeta: coreFile.meta.fileMeta,
                },
            };
        }

        return coreFile;
    }

    async uploadFiles(
        filePayloads: CoreFileUploaded[],
    ): Promise<CoreFile[]>
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
