import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateBoundedContextByIdHandler } from '../handlers/iam-update-bounded-context-by-id.handler';
import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.update')
export class IamUpdateBoundedContextByIdResolver
{
    constructor(
        private readonly handler: IamUpdateBoundedContextByIdHandler,
    ) {}

    @Mutation('iamUpdateBoundedContextById')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}