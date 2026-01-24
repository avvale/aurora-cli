/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamCreateRoleDto,
  IamCreateRoleHandler,
  IamRoleDto,
} from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role')
@Controller('iam/role/create')
@Auth('iam.role.create')
export class IamCreateRoleController {
  constructor(private readonly handler: IamCreateRoleHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create role' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: IamRoleDto,
  })
  async main(
    @Body() payload: IamCreateRoleDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
