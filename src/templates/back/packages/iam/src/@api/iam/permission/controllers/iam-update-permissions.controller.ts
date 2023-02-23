/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamPermissionDto, IamUpdatePermissionsDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdatePermissionsHandler } from '../handlers/iam-update-permissions.handler';

@ApiTags('[iam] permission')
@Controller('iam/permissions/update')
@Permissions('iam.permission.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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