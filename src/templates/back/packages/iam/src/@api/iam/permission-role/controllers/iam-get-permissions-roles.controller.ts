/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamPermissionRoleDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetPermissionsRolesHandler } from '../handlers/iam-get-permissions-roles.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/get')
@Auth('iam.role.get')
export class IamGetPermissionsRolesController
{
    constructor(
        private readonly handler: IamGetPermissionsRolesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get permissions roles according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamPermissionRoleDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
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