/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthFindScopeHandler, OAuthScopeDto } from '@api/o-auth/scope';
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

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/find')
@Auth('oAuth.scope.get')
export class OAuthFindScopeController {
  constructor(private readonly handler: OAuthFindScopeHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Find scope according to query' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: OAuthScopeDto,
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
