import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingFindSideEffectHandler } from '../handlers/auditing-find-side-effect.handler';
import { AuditingSideEffect } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.get')
export class AuditingFindSideEffectResolver
{
    constructor(
        private readonly handler: AuditingFindSideEffectHandler,
    ) {}

    @Query('auditingFindSideEffect')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}