import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateApplicationByIdHandler } from '../handlers/o-auth-update-application-by-id.handler';
import { OAuthApplication, OAuthUpdateApplicationByIdInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.application.update')
export class OAuthUpdateApplicationByIdResolver
{
    constructor(
        private readonly handler: OAuthUpdateApplicationByIdHandler,
    ) {}

    @Mutation('oAuthUpdateApplicationById')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}