/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Pagination, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginateRolesHandler } from '../handlers/iam-paginate-roles.handler';

@ApiTags('[iam] role')
@Controller('iam/roles/paginate')
@Permissions('iam.role.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamPaginateRolesController
{
    constructor(
        private readonly handler: IamPaginateRolesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate roles' })
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