/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindPermissionRoleHandler, IamPermissionRoleDto } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permission-role/find')
@Auth('iam.permissionRole.get')
export class IamFindPermissionRoleController
{
    constructor(
        private readonly handler: IamFindPermissionRoleHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find permission-role according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamPermissionRoleDto })
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
