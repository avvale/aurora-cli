import { AuditingSideEffectDto } from '@api/auditing/side-effect';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingGetSideEffectsQuery } from '@app/auditing/side-effect';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingGetSideEffectsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<AuditingSideEffect[] | AuditingSideEffectDto[]> {
    return await this.queryBus.ask(
      new AuditingGetSideEffectsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
