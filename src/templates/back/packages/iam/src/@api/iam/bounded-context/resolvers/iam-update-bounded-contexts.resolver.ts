import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateBoundedContextsHandler } from '../handlers/iam-update-bounded-contexts.handler';
import { IamBoundedContext, IamUpdateBoundedContextsInput } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.update')
export class IamUpdateBoundedContextsResolver
{
    constructor(
        private readonly handler: IamUpdateBoundedContextsHandler,
    ) {}

    @Mutation('iamUpdateBoundedContexts')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}