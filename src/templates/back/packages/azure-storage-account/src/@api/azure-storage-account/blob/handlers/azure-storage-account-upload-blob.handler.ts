/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { AzureStorageAccountUploadBlobService } from '@api/azure-storage-account/blob/shared';
import { CoreFileUploaded } from '@api/graphql';

@Injectable()
export class AzureStorageAccountUploadBlobHandler
{
    constructor(
        private readonly azureStorageAccountUploadBlobService: AzureStorageAccountUploadBlobService,
    ) {}

    main(
        file: CoreFileUploaded,
    )
    {
        return this.azureStorageAccountUploadBlobService.uploadFile(
            file,
        );
    }
}
