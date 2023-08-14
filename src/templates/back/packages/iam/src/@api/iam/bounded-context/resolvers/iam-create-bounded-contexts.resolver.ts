import { IamCreateBoundedContextInput } from '@api/graphql';
import { IamCreateBoundedContextsHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
