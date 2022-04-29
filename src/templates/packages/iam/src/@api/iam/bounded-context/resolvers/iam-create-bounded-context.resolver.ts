import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';
import { IamBoundedContext, IamCreateBoundedContextInput } from '../../../../graphql';

@Resolver()
export class IamCreateBoundedContextResolver
{
    constructor(
        private readonly handler: IamCreateBoundedContextHandler,
    ) {}

    @Mutation('iamCreateBoundedContext')
    async main(
        @Args('payload') payload: IamCreateBoundedContextInput,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}