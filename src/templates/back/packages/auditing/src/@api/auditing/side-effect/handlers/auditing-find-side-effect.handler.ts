import { AuditingSideEffectDto } from '@api/auditing/side-effect';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingFindSideEffectQuery } from '@app/auditing/side-effect';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingFindSideEffectHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<AuditingSideEffect | AuditingSideEffectDto> {
    return await this.queryBus.ask(
      new AuditingFindSideEffectQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
