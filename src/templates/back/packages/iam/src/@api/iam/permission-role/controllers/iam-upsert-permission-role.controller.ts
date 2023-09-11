/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamPermissionRoleDto, IamUpdatePermissionRoleByIdDto, IamUpsertPermissionRoleHandler } from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permission-role/upsert')
@Auth('iam.permissionRole.upsert')
export class IamUpsertPermissionRoleController
{
    constructor(
        private readonly handler: IamUpsertPermissionRoleHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert permission-role' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamPermissionRoleDto })
    async main(
        @Body() payload: IamUpdatePermissionRoleByIdDto,
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
