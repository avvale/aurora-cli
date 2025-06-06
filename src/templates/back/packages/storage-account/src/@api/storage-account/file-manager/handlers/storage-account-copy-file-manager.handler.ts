/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountFileManagerFileInput } from '@api/graphql';
import { StorageAccountFileManagerFileDto } from '@api/storage-account/file-manager';
import { StorageAccountFileManagerService } from '@api/storage-account/file-manager/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageAccountCopyFileManagerHandler
{
    constructor(
        private readonly storageAccountFileManagerService: StorageAccountFileManagerService,
    ) {}

    main(
        src: StorageAccountFileManagerFileInput | StorageAccountFileManagerFileDto,
        dest: StorageAccountFileManagerFileInput | StorageAccountFileManagerFileDto,
    )
    {
        return this.storageAccountFileManagerService.copy(
            src,
            dest,
        );
    }
}
