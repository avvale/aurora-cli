/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamCreateTenantDto,
  IamCreateTenantsHandler,
  IamTenantDto,
} from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/create')
@Auth('iam.tenant.create')
export class IamCreateTenantsController {
  constructor(private readonly handler: IamCreateTenantsHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create tenants in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [IamTenantDto],
  })
  @ApiBody({ type: [IamCreateTenantDto] })
  async main(
    @Body() payload: IamCreateTenantDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
