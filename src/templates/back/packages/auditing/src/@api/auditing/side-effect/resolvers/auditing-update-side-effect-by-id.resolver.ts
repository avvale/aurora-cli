import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingUpdateSideEffectByIdHandler } from '../handlers/auditing-update-side-effect-by-id.handler';
import { AuditingSideEffect, AuditingUpdateSideEffectByIdInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingUpdateSideEffectByIdResolver
{
    constructor(
        private readonly handler: AuditingUpdateSideEffectByIdHandler,
    ) {}

    @Mutation('auditingUpdateSideEffectById')
    async main(
        @Args('payload') payload: AuditingUpdateSideEffectByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}