import { OAuthScope } from '@api/graphql';
import { OAuthGetScopesHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.scope.get')
export class OAuthGetScopesResolver {
  constructor(private readonly handler: OAuthGetScopesHandler) {}

  @Query('oAuthGetScopes')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<OAuthScope[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
