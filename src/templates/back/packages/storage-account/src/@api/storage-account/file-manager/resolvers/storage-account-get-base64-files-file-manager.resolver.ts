import {
  StorageAccountFileManagerBase64,
  StorageAccountFileManagerFileInput,
} from '@api/graphql';
import { StorageAccountGetBase64FilesFileManagerHandler } from '@api/storage-account/file-manager';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('storageAccount.fileManager.get')
export class StorageAccountGetBase64FilesFileManagerResolver {
  constructor(
    private readonly handler: StorageAccountGetBase64FilesFileManagerHandler,
  ) {}

  @Query('storageAccountGetBase64FilesFileManager')
  async main(
    @Args('files') files: StorageAccountFileManagerFileInput[],
  ): Promise<StorageAccountFileManagerBase64[]> {
    return await this.handler.main(files);
  }
}
