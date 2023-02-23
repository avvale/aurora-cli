/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Pagination, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginatePermissionsRolesHandler } from '../handlers/iam-paginate-permissions-roles.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/paginate')
@Permissions('iam.role.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamPaginatePermissionsRolesController
{
    constructor(
        private readonly handler: IamPaginatePermissionsRolesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate permissions' })
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