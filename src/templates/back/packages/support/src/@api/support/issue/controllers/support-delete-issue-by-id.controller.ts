/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    SupportDeleteIssueByIdHandler,
    SupportIssueDto,
} from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] issue')
@Controller('support/issue/delete')
@Auth('support.issue.delete')
export class SupportDeleteIssueByIdController {
    constructor(private readonly handler: SupportDeleteIssueByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete issue by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: SupportIssueDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
