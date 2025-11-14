/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuditingPaginateSideEffectsHandler } from '@api/auditing/side-effect';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[auditing] side-effect')
@Controller('auditing/side-effects/paginate')
@Auth('auditing.sideEffect.get')
export class AuditingPaginateSideEffectsController {
    constructor(private readonly handler: AuditingPaginateSideEffectsHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate side-effects' })
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
