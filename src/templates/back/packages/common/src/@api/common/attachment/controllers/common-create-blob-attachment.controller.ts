/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentDto } from '../dto';
import { CommonCreateBlobAttachmentHandler } from '../handlers/common-create-blob-attachment.handler';
import { Auth } from '@aurora/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/create-blob')
@Auth('common.attachment.get')
export class CommonCreateBlobAttachmentController
{
    constructor(
        private readonly handler: CommonCreateBlobAttachmentHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() payload: CommonAttachmentDto,
    )
    {
        return await this.handler.main(
            payload,
        );
    }
}