/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    SupportIssueDto,
    SupportUpdateIssueByIdDto,
    SupportUpdateIssueByIdHandler,
} from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] issue')
@Controller('support/issue/update')
@Auth('support.issue.update')
export class SupportUpdateIssueByIdController {
    constructor(private readonly handler: SupportUpdateIssueByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update issue by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: SupportIssueDto,
    })
    async main(
        @Body() payload: SupportUpdateIssueByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
