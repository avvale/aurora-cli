/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCropAndCreateAttachmentDto } from '../dto';
import { CommonCropAttachmentHandler } from '../handlers/common-crop-attachment.handler';
import { Auth } from '@aurora/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/crop')
@Auth('common.attachment.update')
export class CommonCropAttachmentController
{
    constructor(
        private readonly handler: CommonCropAttachmentHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() payload: CommonCropAndCreateAttachmentDto,
    )
    {
        return await this.handler.main(
            payload,
        );
    }
}