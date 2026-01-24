/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto, IamDeleteAccountByIdHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/account/delete')
@Auth('iam.account.delete')
export class IamDeleteAccountByIdController {
  constructor(private readonly handler: IamDeleteAccountByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: IamAccountDto,
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
