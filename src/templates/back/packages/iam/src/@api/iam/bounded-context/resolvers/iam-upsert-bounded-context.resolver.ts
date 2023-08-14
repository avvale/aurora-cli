import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '@api/graphql';
import { IamUpsertBoundedContextHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.boundedContext.upsert')
export class IamUpsertBoundedContextResolver
{
    constructor(
        private readonly handler: IamUpsertBoundedContextHandler,
    ) {}

    @Mutation('iamUpsertBoundedContext')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextByIdInput,
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
