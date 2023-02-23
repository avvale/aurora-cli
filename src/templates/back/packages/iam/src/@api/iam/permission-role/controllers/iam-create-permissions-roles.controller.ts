/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamPermissionRoleDto, IamCreatePermissionRoleDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreatePermissionsRolesHandler } from '../handlers/iam-create-permissions-roles.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/create')
@Permissions('iam.role.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreatePermissionsRolesController
{
    constructor(
        private readonly handler: IamCreatePermissionsRolesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permissions roles in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamPermissionRoleDto]})
    @ApiBody({ type: [IamCreatePermissionRoleDto]})
    async main(
        @Body() payload: IamCreatePermissionRoleDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}