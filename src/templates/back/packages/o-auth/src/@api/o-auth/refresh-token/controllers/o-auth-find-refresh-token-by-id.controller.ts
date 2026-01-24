/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  OAuthFindRefreshTokenByIdHandler,
  OAuthRefreshTokenDto,
} from '@api/o-auth/refresh-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/find')
@Auth('oAuth.refreshToken.get')
export class OAuthFindRefreshTokenByIdController {
  constructor(private readonly handler: OAuthFindRefreshTokenByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find refresh-token by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: OAuthRefreshTokenDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
