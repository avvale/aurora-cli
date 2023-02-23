import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateBoundedContextsHandler } from '../handlers/iam-update-bounded-contexts.handler';
import { IamBoundedContext, IamUpdateBoundedContextsInput } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateBoundedContextsResolver
{
    constructor(
        private readonly handler: IamUpdateBoundedContextsHandler,
    ) {}

    @Mutation('iamUpdateBoundedContexts')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}