import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingPaginateSideEffectsHandler } from '../handlers/auditing-paginate-side-effects.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.get')
export class AuditingPaginateSideEffectsResolver
{
    constructor(
        private readonly handler: AuditingPaginateSideEffectsHandler,
    ) {}

    @Query('auditingPaginateSideEffects')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}