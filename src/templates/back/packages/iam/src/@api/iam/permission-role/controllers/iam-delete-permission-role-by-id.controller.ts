/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamDeletePermissionRoleByIdHandler,
    IamPermissionRoleDto,
} from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permission-role/delete')
@Auth('iam.permissionRole.delete')
export class IamDeletePermissionRoleByIdController {
    constructor(private readonly handler: IamDeletePermissionRoleByIdHandler) {}

    @Delete(':permissionId/:roleId')
    @ApiOperation({ summary: 'Delete permission-role by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: IamPermissionRoleDto,
    })
    async main(
        @Param('permissionId') permissionId: string,
        @Param('roleId') roleId: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            permissionId,
            roleId,
            constraint,
            timezone,
            auditing,
        );
    }
}
