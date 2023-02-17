import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// @app
import { AuditingCreateSideEffectHandler } from '../handlers/auditing-create-side-effect.handler';
import { AuditingSideEffect, AuditingCreateSideEffectInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingCreateSideEffectResolver
{
    constructor(
        private readonly handler: AuditingCreateSideEffectHandler,
    ) {}

    @Mutation('auditingCreateSideEffect')
    async main(
        @Args('payload') payload: AuditingCreateSideEffectInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}