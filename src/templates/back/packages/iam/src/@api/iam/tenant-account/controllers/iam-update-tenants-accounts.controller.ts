/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamTenantAccountDto,
  IamUpdateTenantsAccountsDto,
  IamUpdateTenantsAccountsHandler,
} from '@api/iam/tenant-account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant-account')
@Controller('iam/tenants-accounts/update')
@Auth('iam.tenantAccount.update')
export class IamUpdateTenantsAccountsController {
  constructor(private readonly handler: IamUpdateTenantsAccountsHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update tenants-accounts' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamTenantAccountDto,
  })
  async main(
    @Body() payload: IamUpdateTenantsAccountsDto,
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
