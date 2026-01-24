/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamDeleteRolesHandler, IamRoleDto } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] role')
@Controller('iam/roles/delete')
@Auth('iam.role.delete')
export class IamDeleteRolesController {
  constructor(private readonly handler: IamDeleteRolesHandler) {}

  @Delete()
  @ApiOperation({ summary: 'Delete roles in batch according to query' })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [IamRoleDto],
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
