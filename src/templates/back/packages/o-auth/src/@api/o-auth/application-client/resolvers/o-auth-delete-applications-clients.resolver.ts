import { OAuthApplicationClient } from '@api/graphql';
import { OAuthDeleteApplicationsClientsHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.applicationClient.delete')
export class OAuthDeleteApplicationsClientsResolver {
  constructor(
    private readonly handler: OAuthDeleteApplicationsClientsHandler,
  ) {}

  @Mutation('oAuthDeleteApplicationsClients')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<OAuthApplicationClient[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
