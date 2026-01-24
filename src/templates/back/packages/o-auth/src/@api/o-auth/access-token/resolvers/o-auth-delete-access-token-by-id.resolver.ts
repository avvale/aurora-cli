import { OAuthAccessToken } from '@api/graphql';
import { OAuthDeleteAccessTokenByIdHandler } from '@api/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.accessToken.delete')
export class OAuthDeleteAccessTokenByIdResolver {
  constructor(private readonly handler: OAuthDeleteAccessTokenByIdHandler) {}

  @Mutation('oAuthDeleteAccessTokenById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<OAuthAccessToken> {
    return await this.handler.main(id, constraint, timezone);
  }
}
