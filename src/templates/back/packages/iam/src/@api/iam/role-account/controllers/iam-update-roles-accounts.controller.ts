/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamRoleAccountDto,
  IamUpdateRolesAccountsDto,
  IamUpdateRolesAccountsHandler,
} from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/roles-accounts/update')
@Auth('iam.roleAccount.update')
export class IamUpdateRolesAccountsController {
  constructor(private readonly handler: IamUpdateRolesAccountsHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update roles-accounts' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamRoleAccountDto,
  })
  async main(
    @Body() payload: IamUpdateRolesAccountsDto,
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
