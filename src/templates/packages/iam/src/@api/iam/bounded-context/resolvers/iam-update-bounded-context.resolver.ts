import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamUpdateBoundedContextHandler } from '../handlers/iam-update-bounded-context.handler';
import { IamBoundedContext, IamUpdateBoundedContextInput } from '../../../../graphql';

@Resolver()
export class IamUpdateBoundedContextResolver
{
    constructor(
        private readonly handler: IamUpdateBoundedContextHandler,
    ) {}

    @Mutation('iamUpdateBoundedContext')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}