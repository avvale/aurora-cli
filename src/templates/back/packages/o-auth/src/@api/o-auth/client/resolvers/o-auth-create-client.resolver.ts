import { OAuthClient, OAuthCreateClientInput } from '@api/graphql';
import { OAuthCreateClientHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.client.create')
export class OAuthCreateClientResolver {
  constructor(private readonly handler: OAuthCreateClientHandler) {}

  @Mutation('oAuthCreateClient')
  async main(
    @Args('payload') payload: OAuthCreateClientInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<OAuthClient> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
