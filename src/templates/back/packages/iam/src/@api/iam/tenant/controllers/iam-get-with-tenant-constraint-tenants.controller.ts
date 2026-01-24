/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TenantConstraint } from '@api/iam/shared';
import { IamGetTenantsHandler } from '@api/iam/tenant';
import { IamAccountResponse } from '@app/iam/account';
import { Auth } from '@aurora/decorators';
import { CurrentAccount, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { IamTenantDto } from '../dto';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/get-with-tenant-constraint')
@Auth('iam.tenant.get')
export class IamGetWithTenantConstraintTenantsController {
  constructor(private readonly handler: IamGetTenantsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Get tenants filtered by the tenants of the user consuming the API',
  })
  @ApiCreatedResponse({
    description: 'Defines the action performed',
    type: [IamTenantDto],
  })
  @ApiQuery({ name: 'queryStatement', type: QueryStatement })
  @ApiQuery({ name: 'constraint', type: QueryStatement })
  @TenantConstraint({
    targetProperty: 'id',
    isArray: false,
  })
  async main(
    @CurrentAccount() account: IamAccountResponse,
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
