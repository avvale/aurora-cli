/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamPermissionRoleDto,
  IamUpdatePermissionRoleByIdDto,
  IamUpdatePermissionRoleByIdHandler,
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
@Controller('iam/permission-role/update')
@Auth('iam.permissionRole.update')
export class IamUpdatePermissionRoleByIdController {
  constructor(private readonly handler: IamUpdatePermissionRoleByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update permission-role by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamPermissionRoleDto,
  })
  async main(
    @Body() payload: IamUpdatePermissionRoleByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
