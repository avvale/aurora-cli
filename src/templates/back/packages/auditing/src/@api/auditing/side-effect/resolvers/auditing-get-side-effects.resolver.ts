import { AuditingGetSideEffectsHandler } from '@api/auditing/side-effect';
import { AuditingSideEffect } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
