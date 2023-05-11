import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingGetSideEffectsHandler } from '../handlers/auditing-get-side-effects.handler';
import { AuditingSideEffect } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.get')
export class AuditingGetSideEffectsResolver
{
    constructor(
        private readonly handler: AuditingGetSideEffectsHandler,
    ) {}

    @Query('auditingGetSideEffects')
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