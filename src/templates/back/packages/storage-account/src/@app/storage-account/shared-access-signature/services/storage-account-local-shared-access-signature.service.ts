import { StorageAccountSharedAccessSignatureService } from '@app/storage-account/shared-access-signature';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StorageAccountLocalSharedAccessSignatureService
    implements StorageAccountSharedAccessSignatureService
{
    generateReadSharedAccessSignature(url: string, expiration: number): string {
        // For local storage, we can simply return the original URL as there are no access restrictions.
        Logger.log(
            'Generating read shared access signature for local storage (no-op)',
            'StorageAccountLocalSharedAccessSignatureService',
        );
        return url;
    }
}
