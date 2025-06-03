import { AzureStorageAccountUploadBlobHandler } from '@api/azure-storage-account/blob';
import { CoreFile, CoreFileUploaded } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('azureStorageAccount.blob.create')
export class AzureStorageAccountUploadBlobResolver
{
    constructor(
        private readonly handler: AzureStorageAccountUploadBlobHandler,
    ) {}

    @Mutation('azureStorageAccountUploadBlob')
    async main(
        @Args('file') file: CoreFileUploaded,
    ): Promise<CoreFile>
    {
        return await this.handler.main(
            file,
        );
    }
}
