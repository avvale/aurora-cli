/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountCopyFileManagerHandler, StorageAccountFileManagerFileDto } from '@api/storage-account/file-manager';
import { Auth } from '@aurora/decorators';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[storage-account] file-manager')
@Controller('storage-account/file-manager/copy')
@Auth('storageAccount.fileManager.copy')
export class StorageAccountCopyFileManagerController
{
    constructor(
        private readonly handler: StorageAccountCopyFileManagerHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Copy file' })
    @ApiCreatedResponse({ description: 'The record has been successfully copied.', type: String })
    main(
        @Body('src') src: StorageAccountFileManagerFileDto,
        @Body('dest') dest: StorageAccountFileManagerFileDto,
    )
    {
        return this.handler.main(
            src,
            dest,
        );
    }
}
