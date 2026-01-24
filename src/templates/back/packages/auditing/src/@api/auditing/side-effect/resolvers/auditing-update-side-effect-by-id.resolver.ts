import { AuditingUpdateSideEffectByIdHandler } from '@api/auditing/side-effect';
import {
  AuditingSideEffect,
  AuditingUpdateSideEffectByIdInput,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.sideEffect.update')
export class AuditingUpdateSideEffectByIdResolver {
  constructor(private readonly handler: AuditingUpdateSideEffectByIdHandler) {}

  @Mutation('auditingUpdateSideEffectById')
  async main(
    @Args('payload') payload: AuditingUpdateSideEffectByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<AuditingSideEffect> {
    return await this.handler.main(payload, constraint, timezone);
  }
}
