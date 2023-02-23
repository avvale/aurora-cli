import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';
import { IamBoundedContext, IamCreateBoundedContextInput } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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