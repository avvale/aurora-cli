import { IamBoundedContext, IamCreateBoundedContextInput } from '@api/graphql';
import { IamCreateBoundedContextHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
