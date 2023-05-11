import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingDeleteSideEffectByIdHandler } from '../handlers/auditing-delete-side-effect-by-id.handler';
import { AuditingSideEffect } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.delete')
export class AuditingDeleteSideEffectByIdResolver
{
    constructor(
        private readonly handler: AuditingDeleteSideEffectByIdHandler,
    ) {}

    @Mutation('auditingDeleteSideEffectById')
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