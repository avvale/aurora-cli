import { OAuthCreateCredentialsInput, OAuthCredentials } from '@api/graphql';
import { GqlHeaders } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OAuthCreateCredentialsHandler } from '../handlers/o-auth-create-credentials.handler';

@Resolver()
export class OAuthCreateCredentialsResolver {
  constructor(private readonly handler: OAuthCreateCredentialsHandler) {}

  @Mutation('oAuthCreateCredentials')
  async main(
    @GqlHeaders() headers: any,
    @Args('payload') payload: OAuthCreateCredentialsInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<OAuthCredentials> {
    return await this.handler.main(
      headers.authorization,
      payload,
      timezone,
      auditing,
    );
  }
}
