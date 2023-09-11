import { OAuthApplicationClient, OAuthApplicationClientMapper, OAuthApplicationClientModel, OAuthIApplicationClientRepository } from '@app/o-auth/application-client';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OAuthSequelizeApplicationClientRepository extends SequelizeRepository<OAuthApplicationClient, OAuthApplicationClientModel> implements OAuthIApplicationClientRepository
{
    public readonly aggregateName: string = 'OAuthApplicationClient';
    public readonly mapper: OAuthApplicationClientMapper = new OAuthApplicationClientMapper();

    constructor(
        @InjectModel(OAuthApplicationClientModel)
        public readonly repository: typeof OAuthApplicationClientModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
