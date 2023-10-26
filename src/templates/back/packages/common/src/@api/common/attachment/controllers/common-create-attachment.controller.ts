/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentDto, CommonCreateAttachmentDto, CommonCreateAttachmentHandler } from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/create')
@Auth('common.attachment.create')
export class CommonCreateAttachmentController
{
    constructor(
        private readonly handler: CommonCreateAttachmentHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create attachment' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CommonAttachmentDto })
    async main(
        @Body() payload: CommonCreateAttachmentDto,
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
