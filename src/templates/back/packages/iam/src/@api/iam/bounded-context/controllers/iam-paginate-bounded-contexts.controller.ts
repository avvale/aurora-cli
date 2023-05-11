/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginateBoundedContextsHandler } from '../handlers/iam-paginate-bounded-contexts.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/paginate')
@Auth('iam.boundedContext.get')
export class IamPaginateBoundedContextsController
{
    constructor(
        private readonly handler: IamPaginateBoundedContextsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate bounded-contexts' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}