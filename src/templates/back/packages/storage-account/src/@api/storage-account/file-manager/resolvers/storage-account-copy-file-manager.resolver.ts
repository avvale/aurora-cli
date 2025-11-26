import { StorageAccountFileManagerFileInput } from '@api/graphql';
import { StorageAccountCopyFileManagerHandler } from '@api/storage-account/file-manager';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('storageAccount.fileManager.copy')
export class StorageAccountCopyFileManagerResolver {
    constructor(
        private readonly handler: StorageAccountCopyFileManagerHandler,
    ) {}

    @Mutation('storageAccountCopyFileManager')
    async main(
        @Args('src') src: StorageAccountFileManagerFileInput,
        @Args('dest') dest: StorageAccountFileManagerFileInput,
    ): Promise<void> {
        return await this.handler.main(src, dest);
    }
}
