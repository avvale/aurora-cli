/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OAuthCreateCredentialsDto } from '../dto';
import { OAuthCreateImpersonalizeCredentialsHandler } from '../handlers/o-auth-create-impersonalize-credentials.handler';

@ApiTags('[o-auth] impersonalize')
@Controller('o-auth/impersonalize-credentials')
@Auth('oAuth.credential.impersonalize')
export class OAuthCreateImpersonalizeCredentialsController {
  constructor(
    private readonly handler: OAuthCreateImpersonalizeCredentialsHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create impersonalize credential' })
  @ApiCreatedResponse({
    description: 'The credential obtained impersonalize.',
    type: OAuthCreateCredentialsDto,
  })
  async main(
    @Body() accountId: string,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(accountId, timezone, auditing);
  }
}
