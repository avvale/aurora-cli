import { OAuthCredentials } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OAuthCreateImpersonalizeCredentialsHandler } from '../handlers/o-auth-create-impersonalize-credentials.handler';

@Resolver()
@Auth('oAuth.credential.impersonalize')
export class OAuthCreateImpersonalizeCredentialsResolver {
  constructor(
    private readonly handler: OAuthCreateImpersonalizeCredentialsHandler,
  ) {}

  @Mutation('oAuthCreateImpersonalizeCredentials')
  async main(
    @Args('accountId') accountId: string,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<OAuthCredentials> {
    return await this.handler.main(accountId, timezone, auditing);
  }
}
