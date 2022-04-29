import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamDeleteBoundedContextsHandler } from '../handlers/iam-delete-bounded-contexts.handler';
import { IamBoundedContext } from '../../../../graphql';

@Resolver()
export class IamDeleteBoundedContextsResolver
{
    constructor(
        private readonly handler: IamDeleteBoundedContextsHandler,
    ) {}

    @Mutation('iamDeleteBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}