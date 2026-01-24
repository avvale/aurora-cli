/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamTenantAccountDto,
  IamUpdateTenantAccountByIdDto,
  IamUpdateTenantAccountByIdHandler,
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
@Controller('iam/tenant-account/update')
@Auth('iam.tenantAccount.update')
export class IamUpdateTenantAccountByIdController {
  constructor(private readonly handler: IamUpdateTenantAccountByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update tenant-account by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamTenantAccountDto,
  })
  async main(
    @Body() payload: IamUpdateTenantAccountByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
