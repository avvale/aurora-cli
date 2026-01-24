import {
  StorageAccountFileManagerFile,
  StorageAccountFileManagerFileUploadedInput,
} from '@api/graphql';
import { StorageAccountUploadFilesFileManagerHandler } from '@api/storage-account/file-manager';
import { mapResolverFilesWithStream } from '@api/storage-account/shared/functions/map-resolver-files-with-stream.function';
import { Auth } from '@aurora/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('storageAccount.fileManager.upload')
export class StorageAccountUploadFilesFileManagerResolver {
  constructor(
    private readonly handler: StorageAccountUploadFilesFileManagerHandler,
  ) {}

  @Mutation('storageAccountUploadFilesFileManager')
  async main(
    @Args('files') files: StorageAccountFileManagerFileUploadedInput[],
  ): Promise<StorageAccountFileManagerFile[]> {
    // map files to have stream property instead createReadStream method
    const filesWithStream = await mapResolverFilesWithStream(files);

    return await this.handler.main(filesWithStream);
  }
}
