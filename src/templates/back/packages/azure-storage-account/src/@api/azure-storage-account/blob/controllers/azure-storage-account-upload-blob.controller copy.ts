/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AzureStorageAccountGetBase64FromBlobHandler, AzureStorageAccountUploadBlobHandler } from '@api/azure-storage-account/blob';
import { Auth } from '@aurora/decorators';
import { CoreFileUploaded } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[azure-storage-account] blob')
@Controller('azure-storage-account/blob/upload-blob')
@Auth('azureStorageAccount.blob.create')
export class AzureStorageAccountUploadBlobController
{
    constructor(
        private readonly handler: AzureStorageAccountUploadBlobHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Upload file in blob' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: String })
    async main(
        @Body('file') file: CoreFileUploaded,
    )
    {
        return await this.handler.main(
            file,
        );
    }
}
