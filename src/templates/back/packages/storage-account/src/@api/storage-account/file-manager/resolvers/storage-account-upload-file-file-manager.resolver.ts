import { StorageAccountUploadFileFileManagerHandler } from '@api/storage-account/file-manager';
import { StorageAccountFileManagerFile, StorageAccountFileManagerFileUploadedInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('storageAccount.fileManager.upload')
export class StorageAccountUploadFileFileManagerResolver
{
    constructor(
        private readonly handler: StorageAccountUploadFileFileManagerHandler,
    ) {}

    @Mutation('storageAccountUploadFileFileManager')
    async main(
        @Args('file') file: StorageAccountFileManagerFileUploadedInput,
    ): Promise<StorageAccountFileManagerFile>
    {
        return await this.handler.main(
            file,
        );
    }
}

