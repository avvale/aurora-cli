import {
    SharedAccessSignatureExpiration,
    SharedAccessSignaturePermissions,
    StorageAccountSharedAccessSignatureService,
} from '@app/storage-account/shared-access-signature';
import {
    BlobSASPermissions,
    BlobServiceClient,
    generateBlobSASQueryParameters,
    SASProtocol,
    StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageAccountAzureSharedAccessSignatureService
    implements StorageAccountSharedAccessSignatureService
{
    private blobServiceClient: BlobServiceClient;
    private credential: StorageSharedKeyCredential;

    constructor(private readonly configService: ConfigService) {
        const accountName = this.configService.get<string>(
            'AZURE_STORAGE_ACCOUNT_NAME',
        );
        const accountKey = this.configService.get<string>(
            'AZURE_STORAGE_ACCOUNT_KEY',
        );

        if (!accountName || !accountKey) {
            throw new BadRequestException(
                'Azure Storage account name and key must be provided in StorageAccountAzureSharedAccessSignatureService',
            );
        }

        this.credential = new StorageSharedKeyCredential(
            accountName,
            accountKey,
        );

        this.blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net`,
            this.credential,
        );
    }

    generateReadSharedAccessSignature(
        url: string,
        expiration: number = SharedAccessSignatureExpiration.THIRTY_SECONDS,
    ): string {
        const { containerName, blobName } = this.parseBlobStorageUrl(url);

        return this.generateBlobSASUrl(
            blobName,
            containerName,
            SharedAccessSignaturePermissions.READ,
            expiration,
        );
    }

    private generateBlobSASUrl(
        blobName: string,
        containerName: string,
        permissions: SharedAccessSignaturePermissions,
        expiration: number,
    ): string {
        try {
            const containerClient =
                this.blobServiceClient.getContainerClient(containerName);

            const blobClient = containerClient.getBlockBlobClient(blobName);

            const sharedAccessSignature = generateBlobSASQueryParameters(
                {
                    containerName,
                    blobName,
                    permissions: BlobSASPermissions.parse(permissions),
                    startsOn: new Date(),
                    expiresOn: new Date(Date.now() + expiration),
                    protocol: SASProtocol.Https,
                },
                this.credential,
            ).toString();

            return `${blobClient.url}?${sharedAccessSignature}`;
        } catch {
            Logger.error(
                'Error generating Shared Access Signature token for azure Blob Storage',
                'StorageAccountAzureSharedAccessSignatureService',
            );

            throw new BadRequestException(
                'Error generating Shared Access Signature token for azure Blob Storage',
            );
        }
    }

    private parseBlobStorageUrl(url: string): {
        containerName: string;
        blobName: string;
    } {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        const containerName = pathParts[0];
        const blobName = decodeURIComponent(pathParts.slice(1).join('/'));

        return { containerName, blobName };
    }
}
