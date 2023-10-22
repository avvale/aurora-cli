import { AuditingFindSideEffectHandler } from '@api/auditing/side-effect';
import { AuditingSideEffect } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
