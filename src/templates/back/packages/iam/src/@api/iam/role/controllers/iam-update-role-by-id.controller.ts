/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamRoleDto,
  IamUpdateRoleByIdDto,
  IamUpdateRoleByIdHandler,
} from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role')
@Controller('iam/role/update')
@Auth('iam.role.update')
export class IamUpdateRoleByIdController {
  constructor(private readonly handler: IamUpdateRoleByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update role by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamRoleDto,
  })
  async main(
    @Body() payload: IamUpdateRoleByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
