import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamCreateBoundedContextsHandler } from '../handlers/iam-create-bounded-contexts.handler';
import { IamCreateBoundedContextInput } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.create')
export class IamCreateBoundedContextsResolver
{
    constructor(
        private readonly handler: IamCreateBoundedContextsHandler,
    ) {}

    @Mutation('iamCreateBoundedContexts')
    async main(
        @Args('payload') payload: IamCreateBoundedContextInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}