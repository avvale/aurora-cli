/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamGetPermissionsRolesHandler,
    IamPermissionRoleDto,
} from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/get')
@Auth('iam.permissionRole.get')
export class IamGetPermissionsRolesController {
    constructor(private readonly handler: IamGetPermissionsRolesHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get permissions-roles according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
        type: [IamPermissionRoleDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
