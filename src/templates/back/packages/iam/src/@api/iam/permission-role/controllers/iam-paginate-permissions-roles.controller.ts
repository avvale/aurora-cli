/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamPaginatePermissionsRolesHandler } from '../handlers/iam-paginate-permissions-roles.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/paginate')
@Auth('iam.role.get')
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