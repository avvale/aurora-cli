import { StorageAccountUploadFilesFileManagerHandler } from '@api/storage-account/file-manager';
import { StorageAccountFileManagerFile, StorageAccountFileManagerFileUploadedInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('storageAccount.fileManager.upload')
export class StorageAccountUploadFilesFileManagerResolver
{
    constructor(
        private readonly handler: StorageAccountUploadFilesFileManagerHandler,
    ) {}

    @Mutation('storageAccountUploadFilesFileManager')
    async main(
        @Args('files') files: StorageAccountFileManagerFileUploadedInput[],
    ): Promise<StorageAccountFileManagerFile[]>
    {
        return await this.handler.main(
            files,
        );
    }
}

