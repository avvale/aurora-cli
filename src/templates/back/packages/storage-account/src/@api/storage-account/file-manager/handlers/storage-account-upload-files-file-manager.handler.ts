/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountFileManagerFileUploadedInput } from '@api/graphql';
import { StorageAccountFileManagerFileUploadedDto } from '@api/storage-account/file-manager';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageAccountUploadFilesFileManagerHandler {
    constructor(
        private readonly storageAccountFileManagerService: StorageAccountFileManagerService,
    ) {}

    main(
        files:
            | StorageAccountFileManagerFileUploadedInput[]
            | StorageAccountFileManagerFileUploadedDto[],
    ) {
        return this.storageAccountFileManagerService.uploadFiles(files);
    }
}
