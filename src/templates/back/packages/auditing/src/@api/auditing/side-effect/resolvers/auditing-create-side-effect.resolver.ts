import { AuditingCreateSideEffectHandler } from '@api/auditing/side-effect';
import {
    AuditingCreateSideEffectInput,
    AuditingSideEffect,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.sideEffect.create')
export class AuditingCreateSideEffectResolver {
    constructor(private readonly handler: AuditingCreateSideEffectHandler) {}

    @Mutation('auditingCreateSideEffect')
    async main(
        @Args('payload') payload: AuditingCreateSideEffectInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect> {
        return await this.handler.main(payload, timezone);
    }
}
