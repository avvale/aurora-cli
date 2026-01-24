/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthFindScopeByIdHandler, OAuthScopeDto } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/find')
@Auth('oAuth.scope.get')
export class OAuthFindScopeByIdController {
  constructor(private readonly handler: OAuthFindScopeByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find scope by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: OAuthScopeDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
