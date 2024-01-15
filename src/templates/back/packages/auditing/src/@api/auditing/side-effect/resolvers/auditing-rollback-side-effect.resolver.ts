import { AuditingRollbackSideEffectHandler } from '@api/auditing/side-effect';
import { AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

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
