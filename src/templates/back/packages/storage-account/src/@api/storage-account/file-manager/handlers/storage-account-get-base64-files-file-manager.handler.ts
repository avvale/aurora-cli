/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountFileManagerFileInput } from '@api/graphql';
import { StorageAccountFileManagerFileDto, StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageAccountGetBase64FilesFileManagerHandler {
    constructor(
        private readonly storageAccountFileManagerService: StorageAccountFileManagerService,
    ) {}

    main(
        files:
            | StorageAccountFileManagerFileInput[]
            | StorageAccountFileManagerFileDto[],
    ) {
        return this.storageAccountFileManagerService.getBase64Files(files);
    }
}
