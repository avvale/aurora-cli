import { AuditingUpdateSideEffectsHandler } from '@api/auditing/side-effect';
import {
    AuditingSideEffect,
    AuditingUpdateSideEffectsInput,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.sideEffect.update')
export class AuditingUpdateSideEffectsResolver {
    constructor(private readonly handler: AuditingUpdateSideEffectsHandler) {}

    @Mutation('auditingUpdateSideEffects')
    async main(
        @Args('payload') payload: AuditingUpdateSideEffectsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect> {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
