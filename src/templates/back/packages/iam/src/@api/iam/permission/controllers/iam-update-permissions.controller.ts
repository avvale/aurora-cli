/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamPermissionDto, IamUpdatePermissionsDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdatePermissionsHandler } from '../handlers/iam-update-permissions.handler';

@ApiTags('[iam] permission')
@Controller('iam/permissions/update')
@Auth('iam.permission.update')
export class IamUpdatePermissionsController
{
    constructor(
        private readonly handler: IamUpdatePermissionsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update permissions' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamPermissionDto })
    async main(
        @Body() payload: IamUpdatePermissionsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}