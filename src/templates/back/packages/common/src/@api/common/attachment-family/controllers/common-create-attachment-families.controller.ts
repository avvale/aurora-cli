/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentFamilyDto, CommonCreateAttachmentFamiliesHandler, CommonCreateAttachmentFamilyDto } from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-families/create')
@Auth('common.attachmentFamily.create')
export class CommonCreateAttachmentFamiliesController
{
    constructor(
        private readonly handler: CommonCreateAttachmentFamiliesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create attachment-families in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CommonAttachmentFamilyDto]})
    @ApiBody({ type: [CommonCreateAttachmentFamilyDto]})
    async main(
        @Body() payload: CommonCreateAttachmentFamilyDto[],
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
