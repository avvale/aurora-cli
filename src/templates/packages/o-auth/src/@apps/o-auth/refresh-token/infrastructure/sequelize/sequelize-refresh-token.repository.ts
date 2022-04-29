import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from 'aurora-ts-core';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';
import { RefreshTokenMapper } from '../../domain/refresh-token.mapper';
import { OAuthRefreshTokenModel } from './sequelize-refresh-token.model';

@Injectable()
export class SequelizeRefreshTokenRepository extends SequelizeRepository<OAuthRefreshToken, OAuthRefreshTokenModel> implements IRefreshTokenRepository
{
    public readonly aggregateName: string = 'OAuthRefreshToken';
    public readonly mapper: RefreshTokenMapper = new RefreshTokenMapper();

    constructor(
        @InjectModel(OAuthRefreshTokenModel)
        public readonly repository: typeof OAuthRefreshTokenModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }
}