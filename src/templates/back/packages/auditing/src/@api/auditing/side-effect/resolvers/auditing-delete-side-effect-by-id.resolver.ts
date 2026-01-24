import { AuditingDeleteSideEffectByIdHandler } from '@api/auditing/side-effect';
import { AuditingSideEffect } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.sideEffect.delete')
export class AuditingDeleteSideEffectByIdResolver {
  constructor(private readonly handler: AuditingDeleteSideEffectByIdHandler) {}

  @Mutation('auditingDeleteSideEffectById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<AuditingSideEffect> {
    return await this.handler.main(id, constraint, timezone);
  }
}
