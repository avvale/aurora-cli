import { AuditingCreateSideEffectsHandler } from '@api/auditing/side-effect';
import { AuditingCreateSideEffectInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.sideEffect.create')
export class AuditingCreateSideEffectsResolver {
    constructor(private readonly handler: AuditingCreateSideEffectsHandler) {}

    @Mutation('auditingCreateSideEffects')
    async main(
        @Args('payload') payload: AuditingCreateSideEffectInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean> {
        return await this.handler.main(payload, timezone);
    }
}
