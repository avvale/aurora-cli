/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamFindPermissionRoleByIdHandler,
  IamPermissionRoleDto,
} from '@api/iam/permission-role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] permission-role')
@Controller('iam/permission-role/find')
@Auth('iam.permissionRole.get')
export class IamFindPermissionRoleByIdController {
  constructor(private readonly handler: IamFindPermissionRoleByIdHandler) {}

  @Post(':permissionId/:roleId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find permission-role by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: IamPermissionRoleDto,
  })
  async main(
    @Param('permissionId') permissionId: string,
    @Param('roleId') roleId: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(permissionId, roleId, constraint, timezone);
  }
}
