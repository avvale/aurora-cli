import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpsertBoundedContextHandler } from '../handlers/iam-upsert-bounded-context.handler';
import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '@api/graphql';

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