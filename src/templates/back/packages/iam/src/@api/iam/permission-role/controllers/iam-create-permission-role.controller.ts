/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamPermissionRoleDto, IamCreatePermissionRoleDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreatePermissionRoleHandler } from '../handlers/iam-create-permission-role.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/role/create')
@Permissions('iam.role.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreatePermissionRoleController
{
    constructor(
        private readonly handler: IamCreatePermissionRoleHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permission' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamPermissionRoleDto })
    async main(
        @Body() payload: IamCreatePermissionRoleDto,
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