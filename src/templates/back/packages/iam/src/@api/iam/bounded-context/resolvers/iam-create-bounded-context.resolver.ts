import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';
import { IamBoundedContext, IamCreateBoundedContextInput } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.create')
export class IamCreateBoundedContextResolver
{
    constructor(
        private readonly handler: IamCreateBoundedContextHandler,
    ) {}

    @Mutation('iamCreateBoundedContext')
    async main(
        @Args('payload') payload: IamCreateBoundedContextInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}