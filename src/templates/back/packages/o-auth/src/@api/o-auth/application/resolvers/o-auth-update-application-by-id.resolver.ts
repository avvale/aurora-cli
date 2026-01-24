import {
  OAuthApplication,
  OAuthUpdateApplicationByIdInput,
} from '@api/graphql';
import { OAuthUpdateApplicationByIdHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.update')
export class OAuthUpdateApplicationByIdResolver {
  constructor(private readonly handler: OAuthUpdateApplicationByIdHandler) {}

  @Mutation('oAuthUpdateApplicationById')
  async main(
    @Args('payload') payload: OAuthUpdateApplicationByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<OAuthApplication> {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
