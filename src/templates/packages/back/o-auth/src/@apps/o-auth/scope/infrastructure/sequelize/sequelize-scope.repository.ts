import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from '@aurora-ts/core';
import { IScopeRepository } from '../../domain/scope.repository';
import { OAuthScope } from '../../domain/scope.aggregate';
import { ScopeMapper } from '../../domain/scope.mapper';
import { OAuthScopeModel } from './sequelize-scope.model';

@Injectable()
export class SequelizeScopeRepository extends SequelizeRepository<OAuthScope, OAuthScopeModel> implements IScopeRepository
{
    public readonly aggregateName: string = 'OAuthScope';
    public readonly mapper: ScopeMapper = new ScopeMapper();

    constructor(
        @InjectModel(OAuthScopeModel)
        public readonly repository: typeof OAuthScopeModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}