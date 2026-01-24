/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamCreateRoleDto,
  IamCreateRolesHandler,
  IamRoleDto,
} from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] role')
@Controller('iam/roles/create')
@Auth('iam.role.create')
export class IamCreateRolesController {
  constructor(private readonly handler: IamCreateRolesHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create roles in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [IamRoleDto],
  })
  @ApiBody({ type: [IamCreateRoleDto] })
  async main(
    @Body() payload: IamCreateRoleDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
