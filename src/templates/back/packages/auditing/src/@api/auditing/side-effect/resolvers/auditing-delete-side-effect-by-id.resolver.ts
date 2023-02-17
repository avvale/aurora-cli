import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { AuditingDeleteSideEffectByIdHandler } from '../handlers/auditing-delete-side-effect-by-id.handler';
import { AuditingSideEffect } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingDeleteSideEffectByIdResolver
{
    constructor(
        private readonly handler: AuditingDeleteSideEffectByIdHandler,
    ) {}

    @Mutation('auditingDeleteSideEffectById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}