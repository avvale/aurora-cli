/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OAuthClientDto, OAuthFindClientByIdHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/find')
@Auth('oAuth.client.get')
export class OAuthFindClientByIdController {
  constructor(private readonly handler: OAuthFindClientByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find client by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: OAuthClientDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
