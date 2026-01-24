/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OAuthCreateCredentialsDto } from '../dto';
import { OAuthCreateCredentialsHandler } from '../handlers/o-auth-create-credentials.handler';

@ApiTags('[o-auth] credential')
@Controller('o-auth/credentials')
export class OAuthCreateCredentialsController {
  constructor(private readonly handler: OAuthCreateCredentialsHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create credential' })
  @ApiCreatedResponse({
    description: 'The credential obtained after login.',
    type: OAuthCreateCredentialsDto,
  })
  async main(
    @Headers('Authorization') authorization: string,
    @Body() payload: OAuthCreateCredentialsDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(authorization, payload, timezone, auditing);
  }
}
