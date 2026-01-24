import {
  OAuthApplicationClient,
  OAuthCreateApplicationClientInput,
} from '@api/graphql';
import { OAuthCreateApplicationClientHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.applicationClient.create')
export class OAuthCreateApplicationClientResolver {
  constructor(private readonly handler: OAuthCreateApplicationClientHandler) {}

  @Mutation('oAuthCreateApplicationClient')
  async main(
    @Args('payload') payload: OAuthCreateApplicationClientInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<OAuthApplicationClient> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
