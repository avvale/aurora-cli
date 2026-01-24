/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamDeleteRolesAccountsHandler,
  IamRoleAccountDto,
} from '@api/iam/role-account';
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

@ApiTags('[iam] role-account')
@Controller('iam/roles-accounts/delete')
@Auth('iam.roleAccount.delete')
export class IamDeleteRolesAccountsController {
  constructor(private readonly handler: IamDeleteRolesAccountsHandler) {}

  @Delete()
  @ApiOperation({
    summary: 'Delete roles-accounts in batch according to query',
  })
  @ApiOkResponse({
    description: 'The records has been deleted successfully.',
    type: [IamRoleAccountDto],
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
