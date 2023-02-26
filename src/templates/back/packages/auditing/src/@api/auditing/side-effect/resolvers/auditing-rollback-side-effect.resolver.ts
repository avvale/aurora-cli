import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingRollbackSideEffectHandler } from '../handlers/auditing-rollback-side-effect.handler';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.rollback')
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