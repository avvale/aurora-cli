/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SupportPaginateIssuesHandler } from '@api/support/issue';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[support] issue')
@Controller('support/issues/paginate')
@Auth('support.issue.get')
export class SupportPaginateIssuesController {
    constructor(private readonly handler: SupportPaginateIssuesHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate issues' })
    @ApiOkResponse({
        description: 'The records has been paginated successfully.',
        type: Pagination,
    })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
