import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurora-ts/core';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';
import { SideEffectMapper } from '../../domain/side-effect.mapper';
import { AuditingSideEffectModel } from './sequelize-side-effect.model';

@Injectable()
export class SequelizeSideEffectRepository extends SequelizeRepository<AuditingSideEffect, AuditingSideEffectModel> implements ISideEffectRepository
{
    public readonly aggregateName: string = 'AuditingSideEffect';
    public readonly mapper: SideEffectMapper = new SideEffectMapper();

    constructor(
        @InjectModel(AuditingSideEffectModel)
        public readonly repository: typeof AuditingSideEffectModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}