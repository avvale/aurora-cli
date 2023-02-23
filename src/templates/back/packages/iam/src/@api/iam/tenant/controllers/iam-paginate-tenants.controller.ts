/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Pagination, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginateTenantsHandler } from '../handlers/iam-paginate-tenants.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/paginate')
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamPaginateTenantsController
{
    constructor(
        private readonly handler: IamPaginateTenantsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate tenants' })
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