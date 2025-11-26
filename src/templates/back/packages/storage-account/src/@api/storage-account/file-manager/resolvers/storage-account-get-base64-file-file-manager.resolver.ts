import {
    StorageAccountFileManagerBase64,
    StorageAccountFileManagerFileInput,
} from '@api/graphql';
import { StorageAccountGetBase64FileFileManagerHandler } from '@api/storage-account/file-manager';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('storageAccount.fileManager.get')
export class StorageAccountGetBase64FileFileManagerResolver {
    constructor(
        private readonly handler: StorageAccountGetBase64FileFileManagerHandler,
    ) {}

    @Query('storageAccountGetBase64FileFileManager')
    async main(
        @Args('file') file: StorageAccountFileManagerFileInput,
    ): Promise<StorageAccountFileManagerBase64> {
        return await this.handler.main(file);
    }
}
