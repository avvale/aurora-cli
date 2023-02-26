import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpsertSideEffectHandler } from '../handlers/auditing-upsert-side-effect.handler';
import { AuditingSideEffect, AuditingUpdateSideEffectByIdInput } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.upsert')
export class AuditingUpsertSideEffectResolver
{
    constructor(
        private readonly handler: AuditingUpsertSideEffectHandler,
    ) {}

    @Mutation('auditingUpsertSideEffect')
    async main(
        @Args('payload') payload: AuditingUpdateSideEffectByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}