/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  OAuthApplicationClientDto,
  OAuthFindApplicationClientByIdHandler,
} from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application-client')
@Controller('o-auth/application-client/find')
@Auth('oAuth.applicationClient.get')
export class OAuthFindApplicationClientByIdController {
  constructor(
    private readonly handler: OAuthFindApplicationClientByIdHandler,
  ) {}

  @Post(':applicationId/:clientId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find application-client by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: OAuthApplicationClientDto,
  })
  async main(
    @Param('applicationId') applicationId: string,
    @Param('clientId') clientId: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(
      applicationId,
      clientId,
      constraint,
      timezone,
    );
  }
}
