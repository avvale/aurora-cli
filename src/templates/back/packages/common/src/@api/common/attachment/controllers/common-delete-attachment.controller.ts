/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentDto } from '../dto';
import { CommonDeleteAttachmentHandler } from '../handlers/common-delete-attachment.handler';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/delete')
@Auth('common.attachment.delete')
export class CommonDeleteAttachmentController
{
    constructor(
        private readonly handler: CommonDeleteAttachmentHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() payload: CommonAttachmentDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}