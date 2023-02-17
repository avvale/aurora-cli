import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingFindSideEffectHandler } from '../handlers/auditing-find-side-effect.handler';
import { AuditingSideEffect } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingFindSideEffectResolver
{
    constructor(
        private readonly handler: AuditingFindSideEffectHandler,
    ) {}

    @Query('auditingFindSideEffect')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}