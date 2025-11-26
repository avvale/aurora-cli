/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    StorageAccountFileManagerFileDto,
    StorageAccountGetBase64FileFileManagerHandler,
} from '@api/storage-account/file-manager';
import { Auth } from '@aurora/decorators';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[storage-account] file-manager')
@Controller('storage-account/file-manager/get-base64-file')
@Auth('storageAccount.fileManager.get')
export class StorageAccountGetBase64FileFileManagerController {
    constructor(
        private readonly handler: StorageAccountGetBase64FileFileManagerHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get base64 file' })
    @ApiCreatedResponse({
        description: 'The record has been successfully uploaded.',
        type: String,
    })
    main(@Body('file') file: StorageAccountFileManagerFileDto) {
        return this.handler.main(file);
    }
}
