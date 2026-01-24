/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamDeleteRoleByIdHandler, IamRoleDto } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role')
@Controller('iam/role/delete')
@Auth('iam.role.delete')
export class IamDeleteRoleByIdController {
  constructor(private readonly handler: IamDeleteRoleByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: IamRoleDto,
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
