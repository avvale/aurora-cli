import {
  AuditingISideEffectRepository,
  AuditingSideEffect,
  AuditingSideEffectMapper,
  AuditingSideEffectModel,
} from '@app/auditing/side-effect';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuditingSequelizeSideEffectRepository
  extends SequelizeRepository<AuditingSideEffect, AuditingSideEffectModel>
  implements AuditingISideEffectRepository
{
  public readonly aggregateName: string = 'AuditingSideEffect';
  public readonly mapper: AuditingSideEffectMapper =
    new AuditingSideEffectMapper();

  constructor(
    @InjectModel(AuditingSideEffectModel)
    public readonly repository: typeof AuditingSideEffectModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
