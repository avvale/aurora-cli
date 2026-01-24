import { OAuthClient } from '@api/graphql';
import { OAuthDeleteClientByIdHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.client.delete')
export class OAuthDeleteClientByIdResolver {
  constructor(private readonly handler: OAuthDeleteClientByIdHandler) {}

  @Mutation('oAuthDeleteClientById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<OAuthClient> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
