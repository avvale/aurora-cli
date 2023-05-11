import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingUpdateSideEffectsHandler } from '../handlers/auditing-update-side-effects.handler';
import { AuditingSideEffect, AuditingUpdateSideEffectsInput } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.update')
export class AuditingUpdateSideEffectsResolver
{
    constructor(
        private readonly handler: AuditingUpdateSideEffectsHandler,
    ) {}

    @Mutation('auditingUpdateSideEffects')
    async main(
        @Args('payload') payload: AuditingUpdateSideEffectsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}