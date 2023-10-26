/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CoreFileUploaded } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonUploadAttachmentsHandler } from '../handlers/common-upload-attachments.handler';

@ApiTags('[common] attachment')
@Controller('common/attachments/upload')
@Auth('common.attachment.upload')
export class CommonUploadAttachmentsController
{
    constructor(
        private readonly handler: CommonUploadAttachmentsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body('files') files: CoreFileUploaded[],
    )
    {
        return await this.handler.main(
            files,
        );
    }
}