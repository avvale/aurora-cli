import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { AuditingCreateSideEffectHandler } from '../handlers/auditing-create-side-effect.handler';
import { AuditingSideEffect, AuditingCreateSideEffectInput } from '@api/graphql';

@Resolver()
@Auth('auditing.sideEffect.create')
export class AuditingCreateSideEffectResolver
{
    constructor(
        private readonly handler: AuditingCreateSideEffectHandler,
    ) {}

    @Mutation('auditingCreateSideEffect')
    async main(
        @Args('payload') payload: AuditingCreateSideEffectInput,
        @Timezone() timezone?: string,
    ): Promise<AuditingSideEffect>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}