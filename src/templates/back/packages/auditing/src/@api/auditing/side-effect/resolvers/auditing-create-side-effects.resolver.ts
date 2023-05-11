import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingCreateSideEffectsHandler } from '../handlers/auditing-create-side-effects.handler';
import { AuditingCreateSideEffectInput } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.create')
export class AuditingCreateSideEffectsResolver
{
    constructor(
        private readonly handler: AuditingCreateSideEffectsHandler,
    ) {}

    @Mutation('auditingCreateSideEffects')
    async main(
        @Args('payload') payload: AuditingCreateSideEffectInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}