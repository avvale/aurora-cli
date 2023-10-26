/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentLibraryDto, CommonDeleteAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-library')
@Controller('common/attachment-library/delete')
@Auth('common.attachmentLibrary.delete')
export class CommonDeleteAttachmentLibraryByIdController
{
    constructor(
        private readonly handler: CommonDeleteAttachmentLibraryByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete attachment-library by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CommonAttachmentLibraryDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}
