import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateBoundedContextsHandler } from '../handlers/iam-create-bounded-contexts.handler';
import { IamCreateBoundedContextInput } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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