/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingPaginateHttpCommunicationsHandler } from '@api/auditing/http-communication';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[auditing] http-communication')
@Controller('auditing/http-communications/paginate')
@Auth('auditing.httpCommunication.get')
export class AuditingPaginateHttpCommunicationsController {
    constructor(
        private readonly handler: AuditingPaginateHttpCommunicationsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate http-communications' })
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
