/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentLibraryDto, CommonUpdateAttachmentLibraryByIdDto, CommonUpdateAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-library')
@Controller('common/attachment-library/update')
@Auth('common.attachmentLibrary.update')
export class CommonUpdateAttachmentLibraryByIdController
{
    constructor(
        private readonly handler: CommonUpdateAttachmentLibraryByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update attachment-library by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAttachmentLibraryDto })
    async main(
        @Body() payload: CommonUpdateAttachmentLibraryByIdDto,
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
