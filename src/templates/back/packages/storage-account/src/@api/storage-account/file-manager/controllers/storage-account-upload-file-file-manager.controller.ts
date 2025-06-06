/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StorageAccountFileManagerFileUploadedDto, StorageAccountUploadFileFileManagerHandler } from '@api/storage-account/file-manager';
import { Auth } from '@aurora/decorators';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[storage-account] file-manager')
@Controller('storage-account/file-manager/upload-file')
@Auth('storageAccount.fileManager.upload')
export class StorageAccountUploadFileFileManagerController
{
    constructor(
        private readonly handler: StorageAccountUploadFileFileManagerHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Upload file' })
    @ApiCreatedResponse({ description: 'The record has been successfully uploaded.', type: String })
    async main(
        @Body('file') file: StorageAccountFileManagerFileUploadedDto,
    )
    {
        return await this.handler.main(
            file,
        );
    }
}
