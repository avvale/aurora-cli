import { OAuthCreateClientInput } from '@api/graphql';
import { OAuthCreateClientsHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.client.create')
export class OAuthCreateClientsResolver {
  constructor(private readonly handler: OAuthCreateClientsHandler) {}

  @Mutation('oAuthCreateClients')
  async main(
    @Args('payload') payload: OAuthCreateClientInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
