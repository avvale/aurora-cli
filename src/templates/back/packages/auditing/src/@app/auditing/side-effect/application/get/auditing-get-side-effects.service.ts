import {
  AuditingISideEffectRepository,
  AuditingSideEffect,
} from '@app/auditing/side-effect';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingGetSideEffectsService {
  constructor(private readonly repository: AuditingISideEffectRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<AuditingSideEffect[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
