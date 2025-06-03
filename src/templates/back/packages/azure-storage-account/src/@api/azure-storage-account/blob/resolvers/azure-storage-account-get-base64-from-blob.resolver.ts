import { AzureStorageAccountGetBase64FromBlobHandler } from '@api/azure-storage-account/blob';
import { AzureStorageAccountBase64Blob } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('azureStorageAccount.blob.get')
export class AzureStorageAccountGetBase64FromBlobResolver
{
    constructor(
        private readonly handler: AzureStorageAccountGetBase64FromBlobHandler,
    ) {}

    @Query('azureStorageAccountGetBase64FromBlob')
    async main(
        @Args('blobName') blobName: string,
        @Args('relativePathSegments') relativePathSegments: string[],
        @Args('containerName') containerName: string,
    ): Promise<AzureStorageAccountBase64Blob>
    {
        return await this.handler.main(
            blobName,
            relativePathSegments,
            containerName,
        );
    }
}
