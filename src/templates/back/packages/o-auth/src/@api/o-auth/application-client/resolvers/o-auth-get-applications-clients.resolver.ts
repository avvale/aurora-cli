import { OAuthApplicationClient } from '@api/graphql';
import { OAuthGetApplicationsClientsHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.applicationClient.get')
export class OAuthGetApplicationsClientsResolver {
  constructor(private readonly handler: OAuthGetApplicationsClientsHandler) {}

  @Query('oAuthGetApplicationsClients')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<OAuthApplicationClient[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
