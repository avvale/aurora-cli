import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { AuditingRollbackSideEffectHandler } from '../handlers/auditing-rollback-side-effect.handler';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';

@Resolver()
@Permissions('auditing.sideEffect.rollback')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class AuditingRollbackSideEffectResolver
{
    constructor(
        private readonly handler: AuditingRollbackSideEffectHandler,
    ) {}

    @Mutation('auditingRollbackSideEffect')
    async main(
        @Args('payload') payload: AuditingUpdateSideEffectByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}