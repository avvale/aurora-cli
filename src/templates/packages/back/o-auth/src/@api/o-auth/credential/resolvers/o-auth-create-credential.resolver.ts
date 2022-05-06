import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';

// @apps
import { OAuthCreateCredentialHandler } from '../handlers/o-auth-create-credential.handler';
import { OAuthCredential, OAuthCreateCredentialInput } from '../../../../../src/graphql';

@Resolver()
export class OAuthCreateCredentialResolver
{
    constructor(
        private readonly handler: OAuthCreateCredentialHandler,
    ) {}

    @Mutation('oAuthCreateCredential')
    async main(
        @Args('payload') payload: OAuthCreateCredentialInput,
        @Context() context,
    ): Promise<OAuthCredential>
    {
        return await this.handler.main(
            payload,
            context.req.headers.authorization,
        );
    }
}