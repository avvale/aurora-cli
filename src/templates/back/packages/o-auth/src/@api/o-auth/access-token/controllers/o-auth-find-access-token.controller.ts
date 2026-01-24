/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  OAuthAccessTokenDto,
  OAuthFindAccessTokenHandler,
} from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/find')
@Auth('oAuth.accessToken.get')
export class OAuthFindAccessTokenController {
  constructor(private readonly handler: OAuthFindAccessTokenHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find access-token according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: OAuthAccessTokenDto,
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
