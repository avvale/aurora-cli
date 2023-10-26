/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentLibraryDto, CommonUpdateAttachmentLibrariesDto, CommonUpdateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-library')
@Controller('common/attachment-libraries/update')
@Auth('common.attachmentLibrary.update')
export class CommonUpdateAttachmentLibrariesController
{
    constructor(
        private readonly handler: CommonUpdateAttachmentLibrariesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update attachment-libraries' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAttachmentLibraryDto })
    async main(
        @Body() payload: CommonUpdateAttachmentLibrariesDto,
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
