/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthPaginateClientsHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/paginate')
@Auth('oAuth.client.get')
export class OAuthPaginateClientsController {
  constructor(private readonly handler: OAuthPaginateClientsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate clients' })
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
