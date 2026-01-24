import { Pagination } from '@api/graphql';
import { OAuthPaginateScopesHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.scope.get')
export class OAuthPaginateScopesResolver {
  constructor(private readonly handler: OAuthPaginateScopesHandler) {}

  @Query('oAuthPaginateScopes')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
