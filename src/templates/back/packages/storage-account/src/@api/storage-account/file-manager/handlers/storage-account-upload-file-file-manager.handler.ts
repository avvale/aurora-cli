/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountFileManagerFileUploadedInput } from '@api/graphql';
import { StorageAccountFileManagerFileUploadedDto, StorageAccountFileManagerService } from '@api/storage-account/file-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageAccountUploadFileFileManagerHandler {
    constructor(
        private readonly storageAccountFileManagerService: StorageAccountFileManagerService,
    ) {}

    main(
        file:
            | StorageAccountFileManagerFileUploadedInput
            | StorageAccountFileManagerFileUploadedDto,
    ) {
        return this.storageAccountFileManagerService.uploadFile(file);
    }
}
