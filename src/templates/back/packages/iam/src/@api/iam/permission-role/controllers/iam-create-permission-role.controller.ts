/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamCreatePermissionRoleDto,
  IamCreatePermissionRoleHandler,
  IamPermissionRoleDto,
} from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permission-role/create')
@Auth('iam.permissionRole.create')
export class IamCreatePermissionRoleController {
  constructor(private readonly handler: IamCreatePermissionRoleHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create permission-role' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: IamPermissionRoleDto,
  })
  async main(
    @Body() payload: IamCreatePermissionRoleDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
