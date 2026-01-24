/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamPermissionRoleDto,
  IamUpdatePermissionsRolesDto,
  IamUpdatePermissionsRolesHandler,
} from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/update')
@Auth('iam.permissionRole.update')
export class IamUpdatePermissionsRolesController {
  constructor(private readonly handler: IamUpdatePermissionsRolesHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update permissions-roles' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamPermissionRoleDto,
  })
  async main(
    @Body() payload: IamUpdatePermissionsRolesDto,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
