import { OAuthApplication } from '@api/graphql';
import { OAuthFindApplicationByIdHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.get')
export class OAuthFindApplicationByIdResolver {
  constructor(private readonly handler: OAuthFindApplicationByIdHandler) {}

  @Query('oAuthFindApplicationById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<OAuthApplication> {
    return await this.handler.main(id, constraint, timezone);
  }
}
