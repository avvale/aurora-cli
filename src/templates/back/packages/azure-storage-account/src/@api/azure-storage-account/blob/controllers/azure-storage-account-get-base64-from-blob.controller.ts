/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AzureStorageAccountGetBase64FromBlobHandler } from '@api/azure-storage-account/blob';
import { Auth } from '@aurora/decorators';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[azure-storage-account] blob')
@Controller('azure-storage-account/blob/get-base64-from-blob')
@Auth('azureStorageAccount.blob.get')
export class AzureStorageAccountGetBase64FromBlobController
{
    constructor(
        private readonly handler: AzureStorageAccountGetBase64FromBlobHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get blob in base64' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: String })
    async main(
        @Body('blobName') blobName: string,
        @Body('relativePathSegments') relativePathSegments: string[],
        @Body('containerName') containerName?: string,
    )
    {
        return await this.handler.main(
            blobName,
            relativePathSegments,
            containerName,
        );
    }
}
