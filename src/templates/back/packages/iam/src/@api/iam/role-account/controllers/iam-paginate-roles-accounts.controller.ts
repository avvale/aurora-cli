/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamPaginateRolesAccountsHandler } from '@api/iam/role-account';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] role-account')
@Controller('iam/roles-accounts/paginate')
@Auth('iam.roleAccount.get')
export class IamPaginateRolesAccountsController {
  constructor(private readonly handler: IamPaginateRolesAccountsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate roles-accounts' })
  @ApiOkResponse({
    description: 'The records has been paginated successfully.',
    type: Pagination,
  })
  @ApiQuery({ name: 'queryStatement', type: QueryStatement })
  @ApiQuery({ name: 'constraint', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
