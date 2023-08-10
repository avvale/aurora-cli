import { OAuthIRefreshTokenRepository, OAuthRefreshToken, OAuthRefreshTokenMapper, OAuthRefreshTokenModel } from '@app/o-auth/refresh-token';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OAuthSequelizeRefreshTokenRepository extends SequelizeRepository<OAuthRefreshToken, OAuthRefreshTokenModel> implements OAuthIRefreshTokenRepository
{
    public readonly aggregateName: string = 'OAuthRefreshToken';
    public readonly mapper: OAuthRefreshTokenMapper = new OAuthRefreshTokenMapper();

    constructor(
        @InjectModel(OAuthRefreshTokenModel)
        public readonly repository: typeof OAuthRefreshTokenModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
