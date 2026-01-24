import {
  AuditingISideEffectRepository,
  AuditingSideEffect,
} from '@app/auditing/side-effect';
import { AuditingSideEffectId } from '@app/auditing/side-effect/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingFindSideEffectByIdService {
  constructor(private readonly repository: AuditingISideEffectRepository) {}

  async main(
    id: AuditingSideEffectId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<AuditingSideEffect> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
