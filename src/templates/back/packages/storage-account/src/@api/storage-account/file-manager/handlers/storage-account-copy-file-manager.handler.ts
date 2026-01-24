/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountFileManagerFileInput } from '@api/graphql';
import {
  StorageAccountFileManagerFileDto,
  StorageAccountFileManagerService,
} from '@api/storage-account/file-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageAccountCopyFileManagerHandler {
  constructor(
    private readonly storageAccountFileManagerService: StorageAccountFileManagerService,
  ) {}

  main(
    src: StorageAccountFileManagerFileInput | StorageAccountFileManagerFileDto,
    dest: StorageAccountFileManagerFileInput | StorageAccountFileManagerFileDto,
  ) {
    return this.storageAccountFileManagerService.copy(src, dest);
  }
}
