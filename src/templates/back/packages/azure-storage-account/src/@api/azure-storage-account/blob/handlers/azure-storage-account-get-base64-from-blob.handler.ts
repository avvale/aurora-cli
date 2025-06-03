/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { AzureStorageAccountGetBase64FromBlobService } from '@api/azure-storage-account/blob/shared';

@Injectable()
export class AzureStorageAccountGetBase64FromBlobHandler
{
    constructor(
        private readonly azureStorageAccountGetBase64FromBlobService: AzureStorageAccountGetBase64FromBlobService,
    ) {}

    main(
        blobName: string,
        relativePathSegments: string[],
        containerName: string,
    )
    {
        return this.azureStorageAccountGetBase64FromBlobService.main(
            blobName,
            relativePathSegments,
            containerName,
        );
    }
}
