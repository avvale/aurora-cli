import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeleteBoundedContextsHandler } from '../handlers/iam-delete-bounded-contexts.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.delete')
export class IamDeleteBoundedContextsResolver
{
    constructor(
        private readonly handler: IamDeleteBoundedContextsHandler,
    ) {}

    @Mutation('iamDeleteBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}