import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// @app
import { AuditingCreateSideEffectsHandler } from '../handlers/auditing-create-side-effects.handler';
import { AuditingCreateSideEffectInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingCreateSideEffectsResolver
{
    constructor(
        private readonly handler: AuditingCreateSideEffectsHandler,
    ) {}

    @Mutation('auditingCreateSideEffects')
    async main(
        @Args('payload') payload: AuditingCreateSideEffectInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}