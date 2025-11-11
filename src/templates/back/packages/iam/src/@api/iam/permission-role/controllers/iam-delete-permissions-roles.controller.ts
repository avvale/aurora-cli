/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamDeletePermissionsRolesHandler,
    IamPermissionRoleDto,
} from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/delete')
@Auth('iam.permissionRole.delete')
export class IamDeletePermissionsRolesController {
    constructor(private readonly handler: IamDeletePermissionsRolesHandler) {}

    @Delete()
    @ApiOperation({
        summary: 'Delete permissions-roles in batch according to query',
    })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [IamPermissionRoleDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
