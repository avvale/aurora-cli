import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

// @apps
import { OAuthCreateCredentialsHandler } from '../handlers/o-auth-create-credentials.handler';
import { OAuthCredentials, OAuthCreateCredentialsInput } from '../../../../graphql';

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
    ): Promise<OAuthCredentials>
    {
        return await this.handler.main(
            payload,
            context.req.headers.authorization,
        );
    }
}