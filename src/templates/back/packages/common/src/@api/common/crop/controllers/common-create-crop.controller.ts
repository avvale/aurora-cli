/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCreateAttachmentDto } from '../../attachment/dto';
import { CommonCreateCropHandler } from '../handlers/common-create-crop.handler';
import { Auth } from '@aurora/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonCropPropertiesDto } from '../dto';

@ApiTags('[common] attachment')
@Controller('common/attachment/crop')
@Auth('common.attachment.update')
export class CommonCreateCropController
{
    constructor(
        private readonly handler: CommonCreateCropHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() crop: CommonCropPropertiesDto,
        @Body() attachment: CommonCreateAttachmentDto,
    )
    {
        return await this.handler.main(
            crop,
            attachment,
        );
    }
}