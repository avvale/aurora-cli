import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpdateSideEffectByIdHandler } from '../handlers/auditing-update-side-effect-by-id.handler';
import { AuditingSideEffect, AuditingUpdateSideEffectByIdInput } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.update')
export class AuditingUpdateSideEffectByIdResolver
{
    constructor(
        private readonly handler: AuditingUpdateSideEffectByIdHandler,
    ) {}

    @Mutation('auditingUpdateSideEffectById')
    async main(
        @Args('payload') payload: AuditingUpdateSideEffectByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}