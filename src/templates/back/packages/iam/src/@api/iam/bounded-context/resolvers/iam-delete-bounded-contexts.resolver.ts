import { IamBoundedContext } from '@api/graphql';
import { IamDeleteBoundedContextsHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.boundedContext.delete')
export class IamDeleteBoundedContextsResolver {
    constructor(private readonly handler: IamDeleteBoundedContextsHandler) {}

    @Mutation('iamDeleteBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext[]> {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
