/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentFamilyDto, CommonUpdateAttachmentFamilyByIdDto, CommonUpsertAttachmentFamilyHandler } from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-family/upsert')
@Auth('common.attachmentFamily.upsert')
export class CommonUpsertAttachmentFamilyController
{
    constructor(
        private readonly handler: CommonUpsertAttachmentFamilyHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert attachment-family' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: CommonAttachmentFamilyDto })
    async main(
        @Body() payload: CommonUpdateAttachmentFamilyByIdDto,
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
