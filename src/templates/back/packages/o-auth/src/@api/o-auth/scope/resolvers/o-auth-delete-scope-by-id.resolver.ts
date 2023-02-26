import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteScopeByIdHandler } from '../handlers/o-auth-delete-scope-by-id.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.delete')
export class OAuthDeleteScopeByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteScopeByIdHandler,
    ) {}

    @Mutation('oAuthDeleteScopeById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}