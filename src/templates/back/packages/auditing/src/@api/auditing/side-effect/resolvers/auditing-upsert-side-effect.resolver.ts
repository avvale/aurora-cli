import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// @app
import { AuditingUpsertSideEffectHandler } from '../handlers/auditing-upsert-side-effect.handler';
import { AuditingSideEffect, AuditingUpdateSideEffectByIdInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingUpsertSideEffectResolver
{
    constructor(
        private readonly handler: AuditingUpsertSideEffectHandler,
    ) {}

    @Mutation('auditingUpsertSideEffect')
    async main(
        @Args('payload') payload: AuditingUpdateSideEffectByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}