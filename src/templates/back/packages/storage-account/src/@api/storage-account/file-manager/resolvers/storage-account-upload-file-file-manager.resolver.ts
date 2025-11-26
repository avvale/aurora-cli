import {
    StorageAccountFileManagerFile,
    StorageAccountFileManagerFileUploadedInput,
} from '@api/graphql';
import { StorageAccountUploadFileFileManagerHandler } from '@api/storage-account/file-manager';
import { mapResolverFileWithStream } from '@api/storage-account/shared';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('storageAccount.fileManager.upload')
export class StorageAccountUploadFileFileManagerResolver {
    constructor(
        private readonly handler: StorageAccountUploadFileFileManagerHandler,
    ) {}

    @Mutation('storageAccountUploadFileFileManager')
    async main(
        @Args('file') file: StorageAccountFileManagerFileUploadedInput,
    ): Promise<StorageAccountFileManagerFile> {
        // get file to have stream property instead createReadStream method
        const fileWithStream = await mapResolverFileWithStream(file);
        return await this.handler.main(fileWithStream);
    }
}
