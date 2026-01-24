import { Pagination } from '@api/graphql';
import { OAuthPaginateAccessTokensHandler } from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.accessToken.get')
export class OAuthPaginateAccessTokensResolver {
  constructor(private readonly handler: OAuthPaginateAccessTokensHandler) {}

  @Query('oAuthPaginateAccessTokens')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
