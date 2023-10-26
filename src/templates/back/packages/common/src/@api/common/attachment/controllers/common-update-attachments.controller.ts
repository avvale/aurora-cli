/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentDto, CommonUpdateAttachmentsDto, CommonUpdateAttachmentsHandler } from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachments/update')
@Auth('common.attachment.update')
export class CommonUpdateAttachmentsController
{
    constructor(
        private readonly handler: CommonUpdateAttachmentsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update attachments' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAttachmentDto })
    async main(
        @Body() payload: CommonUpdateAttachmentsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
