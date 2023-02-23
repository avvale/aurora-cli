/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Pagination, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginateBoundedContextsHandler } from '../handlers/iam-paginate-bounded-contexts.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/paginate')
@Permissions('iam.boundedContext.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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