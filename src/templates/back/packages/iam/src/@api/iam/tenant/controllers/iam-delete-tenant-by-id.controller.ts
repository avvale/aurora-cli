/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamDeleteTenantByIdHandler, IamTenantDto } from '@api/iam/tenant';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/delete')
@Auth('iam.tenant.delete')
export class IamDeleteTenantByIdController {
  constructor(private readonly handler: IamDeleteTenantByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tenant by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: IamTenantDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
