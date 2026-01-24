import { AuditingPaginateSideEffectsHandler } from '@api/auditing/side-effect';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('auditing.sideEffect.get')
export class AuditingPaginateSideEffectsResolver {
  constructor(private readonly handler: AuditingPaginateSideEffectsHandler) {}

  @Query('auditingPaginateSideEffects')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
