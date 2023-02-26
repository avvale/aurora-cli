/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamDeletePermissionRoleDto, IamPermissionRoleDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeletePermissionRoleByIdHandler } from '../handlers/iam-delete-permission-role-by-id.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/permission-role/delete')
@Auth('iam.role.delete')
export class IamDeletePermissionRoleByIdController
{
    constructor(
        private readonly handler: IamDeletePermissionRoleByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete permission role by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamPermissionRoleDto })
    async main(
        @Body('payload') payload: IamDeletePermissionRoleDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}