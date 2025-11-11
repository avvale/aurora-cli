import { OAuthScope } from '@api/graphql';
import { OAuthDeleteScopeByIdHandler } from '@api/o-auth/scope';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.scope.delete')
export class OAuthDeleteScopeByIdResolver {
    constructor(private readonly handler: OAuthDeleteScopeByIdHandler) {}

    @Mutation('oAuthDeleteScopeById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
