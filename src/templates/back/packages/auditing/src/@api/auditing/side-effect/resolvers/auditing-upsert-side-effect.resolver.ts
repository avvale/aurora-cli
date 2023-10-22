import { AuditingUpsertSideEffectHandler } from '@api/auditing/side-effect';
import { AuditingSideEffect, AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
