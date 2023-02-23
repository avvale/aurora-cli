import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateBoundedContextByIdHandler } from '../handlers/iam-update-bounded-context-by-id.handler';
import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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