import { OAuthIScopeRepository, OAuthScope, OAuthScopeMapper, OAuthScopeModel } from '@app/o-auth/scope';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OAuthSequelizeScopeRepository extends SequelizeRepository<OAuthScope, OAuthScopeModel> implements OAuthIScopeRepository
{
    public readonly aggregateName: string = 'OAuthScope';
    public readonly mapper: OAuthScopeMapper = new OAuthScopeMapper();

    constructor(
        @InjectModel(OAuthScopeModel)
        public readonly repository: typeof OAuthScopeModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
