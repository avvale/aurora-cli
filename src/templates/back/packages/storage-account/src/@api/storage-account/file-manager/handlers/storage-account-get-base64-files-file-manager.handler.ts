/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountFileManagerFileInput } from '@api/graphql';
import { StorageAccountFileManagerFileDto } from '@api/storage-account/file-manager';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager/shared';
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
