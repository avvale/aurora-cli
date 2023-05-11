import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingFindSideEffectByIdHandler } from '../handlers/auditing-find-side-effect-by-id.handler';
import { AuditingSideEffect } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.get')
export class AuditingFindSideEffectByIdResolver
{
    constructor(
        private readonly handler: AuditingFindSideEffectByIdHandler,
    ) {}

    @Query('auditingFindSideEffectById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}