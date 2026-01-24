/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  OAuthApplicationClientDto,
  OAuthCreateApplicationClientDto,
  OAuthCreateApplicationClientHandler,
} from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[o-auth] application-client')
@Controller('o-auth/application-client/create')
@Auth('oAuth.applicationClient.create')
export class OAuthCreateApplicationClientController {
  constructor(private readonly handler: OAuthCreateApplicationClientHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create application-client' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: OAuthApplicationClientDto,
  })
  async main(
    @Body() payload: OAuthCreateApplicationClientDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
