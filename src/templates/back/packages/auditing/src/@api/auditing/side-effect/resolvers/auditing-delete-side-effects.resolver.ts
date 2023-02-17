import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingDeleteSideEffectsHandler } from '../handlers/auditing-delete-side-effects.handler';
import { AuditingSideEffect } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingDeleteSideEffectsResolver
{
    constructor(
        private readonly handler: AuditingDeleteSideEffectsHandler,
    ) {}

    @Mutation('auditingDeleteSideEffects')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}