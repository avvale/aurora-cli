/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamCreateRoleAccountDto,
  IamCreateRolesAccountsHandler,
  IamRoleAccountDto,
} from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/roles-accounts/create')
@Auth('iam.roleAccount.create')
export class IamCreateRolesAccountsController {
  constructor(private readonly handler: IamCreateRolesAccountsHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create roles-accounts in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [IamRoleAccountDto],
  })
  @ApiBody({ type: [IamCreateRoleAccountDto] })
  async main(
    @Body() payload: IamCreateRoleAccountDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
