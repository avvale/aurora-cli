/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamRoleDto,
  IamUpdateRolesDto,
  IamUpdateRolesHandler,
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
@Controller('iam/roles/update')
@Auth('iam.role.update')
export class IamUpdateRolesController {
  constructor(private readonly handler: IamUpdateRolesHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update roles' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamRoleDto,
  })
  async main(
    @Body() payload: IamUpdateRolesDto,
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
