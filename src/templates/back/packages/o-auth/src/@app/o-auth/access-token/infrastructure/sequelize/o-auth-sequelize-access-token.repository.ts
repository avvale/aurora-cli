import {
  OAuthAccessToken,
  OAuthAccessTokenMapper,
  OAuthAccessTokenModel,
  OAuthIAccessTokenRepository,
} from '@app/o-auth/access-token';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OAuthSequelizeAccessTokenRepository
  extends SequelizeRepository<OAuthAccessToken, OAuthAccessTokenModel>
  implements OAuthIAccessTokenRepository
{
  public readonly aggregateName: string = 'OAuthAccessToken';
  public readonly mapper: OAuthAccessTokenMapper = new OAuthAccessTokenMapper();

  constructor(
    @InjectModel(OAuthAccessTokenModel)
    public readonly repository: typeof OAuthAccessTokenModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
