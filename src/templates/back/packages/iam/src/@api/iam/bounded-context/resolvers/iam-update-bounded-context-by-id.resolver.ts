import {
    IamBoundedContext,
    IamUpdateBoundedContextByIdInput,
} from '@api/graphql';
import { IamUpdateBoundedContextByIdHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.boundedContext.update')
export class IamUpdateBoundedContextByIdResolver {
    constructor(private readonly handler: IamUpdateBoundedContextByIdHandler) {}

    @Mutation('iamUpdateBoundedContextById')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext> {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
