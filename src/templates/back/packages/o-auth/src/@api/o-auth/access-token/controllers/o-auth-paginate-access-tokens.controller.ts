/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthPaginateAccessTokensHandler } from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens/paginate')
@Auth('oAuth.accessToken.get')
export class OAuthPaginateAccessTokensController {
  constructor(private readonly handler: OAuthPaginateAccessTokensHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Paginate access-tokens' })
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
