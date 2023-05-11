import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingDeleteSideEffectsHandler } from '../handlers/auditing-delete-side-effects.handler';
import { AuditingSideEffect } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.delete')
export class AuditingDeleteSideEffectsResolver
{
    constructor(
        private readonly handler: AuditingDeleteSideEffectsHandler,
    ) {}

    @Mutation('auditingDeleteSideEffects')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}