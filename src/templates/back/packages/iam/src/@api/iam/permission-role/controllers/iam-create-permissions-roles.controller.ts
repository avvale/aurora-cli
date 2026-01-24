/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamCreatePermissionRoleDto,
  IamCreatePermissionsRolesHandler,
  IamPermissionRoleDto,
} from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/create')
@Auth('iam.permissionRole.create')
export class IamCreatePermissionsRolesController {
  constructor(private readonly handler: IamCreatePermissionsRolesHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create permissions-roles in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [IamPermissionRoleDto],
  })
  @ApiBody({ type: [IamCreatePermissionRoleDto] })
  async main(
    @Body() payload: IamCreatePermissionRoleDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
