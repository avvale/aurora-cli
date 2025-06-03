/* eslint-disable max-len */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureStorageAccountCopyBlobService
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

    async copyBlob(
        originalBlobName: string,
        newBlobName: string,
        containerName: string = 'default',
    ): Promise<string>
    {
        const containerClient = this.blobServiceClient.getContainerClient(containerName);

        const sourceBlobClient = containerClient.getBlobClient(originalBlobName);
        const destinationBlobClient = containerClient.getBlobClient(newBlobName);

        const copyPoller = await destinationBlobClient.beginCopyFromURL(sourceBlobClient.url);
        await copyPoller.pollUntilDone();

        return destinationBlobClient.url;
    }
}
