import { OAuthClient } from '@api/graphql';
import { OAuthFindClientHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.client.get')
export class OAuthFindClientResolver {
  constructor(private readonly handler: OAuthFindClientHandler) {}

  @Query('oAuthFindClient')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<OAuthClient> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
