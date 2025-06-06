/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountFileManagerFileUploadedDto, StorageAccountUploadFilesFileManagerHandler } from '@api/storage-account/file-manager';
import { Auth } from '@aurora/decorators';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[storage-account] file-manager')
@Controller('storage-account/file-manager/upload-files')
@Auth('storageAccount.fileManager.upload')
export class StorageAccountUploadFilesFileManagerController
{
    constructor(
        private readonly handler: StorageAccountUploadFilesFileManagerHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Upload files' })
    @ApiCreatedResponse({ description: 'The record has been successfully uploaded.', type: String })
    async main(
        @Body('files') files: StorageAccountFileManagerFileUploadedDto[],
    )
    {
        return await this.handler.main(
            files,
        );
    }
}
