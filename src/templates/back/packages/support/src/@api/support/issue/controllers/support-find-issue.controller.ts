/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SupportFindIssueHandler, SupportIssueDto } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[support] issue')
@Controller('support/issue/find')
@Auth('support.issue.get')
export class SupportFindIssueController {
    constructor(private readonly handler: SupportFindIssueHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find issue according to query' })
    @ApiOkResponse({
        description: 'The record has been successfully created.',
        type: SupportIssueDto,
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
