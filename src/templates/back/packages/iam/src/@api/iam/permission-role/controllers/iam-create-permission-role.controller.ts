/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { IamPermissionRoleDto, IamCreatePermissionRoleDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreatePermissionRoleHandler } from '../handlers/iam-create-permission-role.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/role/create')
@Auth('iam.role.create')
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