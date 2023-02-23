import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateCredentialsHandler } from '../handlers/o-auth-create-credentials.handler';
import { OAuthCredentials, OAuthCreateCredentialsInput } from '@api/graphql';

@Resolver()
export class OAuthCreateCredentialsResolver
{
    constructor(
        private readonly handler: OAuthCreateCredentialsHandler,
    ) {}

    @Mutation('oAuthCreateCredentials')
    async main(
        @Args('payload') payload: OAuthCreateCredentialsInput,
        @Context() context,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthCredentials>
    {
        return await this.handler.main(
            payload,
            context.req.headers.authorization,
            timezone,
            auditing,
        );
    }
}