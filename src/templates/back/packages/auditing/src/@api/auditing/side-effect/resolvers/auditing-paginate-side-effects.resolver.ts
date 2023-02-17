import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import {  AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingPaginateSideEffectsHandler } from '../handlers/auditing-paginate-side-effects.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingPaginateSideEffectsResolver
{
    constructor(
        private readonly handler: AuditingPaginateSideEffectsHandler,
    ) {}

    @Query('auditingPaginateSideEffects')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}