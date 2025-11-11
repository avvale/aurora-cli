/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamPaginatePermissionsRolesHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/paginate')
@Auth('iam.permissionRole.get')
export class IamPaginatePermissionsRolesController {
    constructor(private readonly handler: IamPaginatePermissionsRolesHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate permissions-roles' })
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
