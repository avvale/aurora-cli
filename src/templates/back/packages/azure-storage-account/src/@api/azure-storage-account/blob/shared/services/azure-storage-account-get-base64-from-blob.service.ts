/* eslint-disable max-len */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { AzureStorageAccountBase64Blob } from '@api/graphql';

@Injectable()
export class AzureStorageAccountGetBase64FromBlobService
{
    private readonly blobServiceClient: BlobServiceClient;

    constructor(
        private readonly configService: ConfigService,
    )
    {
        const connectionString = configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');

        if (!connectionString) throw new BadRequestException('Azure Storage connection string is not defined in the configuration, please set it in the environment variables AZURE_STORAGE_CONNECTION_STRING value.');

        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    }

    async main(
        blobName: string,
        relativePathSegments: string[] = [],
        containerName: string = 'default',
    ): Promise<AzureStorageAccountBase64Blob>
    {
        const containerClient = this.blobServiceClient.getContainerClient(containerName);

        const blobPath = [...relativePathSegments, blobName].join('/');

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
}
