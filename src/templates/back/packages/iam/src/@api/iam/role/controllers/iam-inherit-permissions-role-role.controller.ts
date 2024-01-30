/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamInheritRoleDto } from '../dto';
import { IamInheritPermissionsRoleRoleHandler } from '../handlers/iam-inherit-permissions-role-role.handler';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role')
@Controller('iam/role/inherit-permissions-role')
@Auth('iam.role.update')
export class IamInheritPermissionsRoleRoleController
{
    constructor(
        private readonly handler: IamInheritPermissionsRoleRoleHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Defines the operation of this controller' })
    @ApiCreatedResponse({ description: 'Defines the action performed', type: Boolean })
    async main(
        @Body() payload: IamInheritRoleDto,
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