/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonUpdateAttachmentByIdDto } from '../dto';
import { CommonCropAttachmentHandler } from '../handlers/common-crop-attachment.handler';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
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
        @Body() payload: CommonUpdateAttachmentByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}