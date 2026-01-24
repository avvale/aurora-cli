import {
  OAuthAccessToken,
  OAuthIAccessTokenRepository,
} from '@app/o-auth/access-token';
import { OAuthAccessTokenId } from '@app/o-auth/access-token/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindAccessTokenByIdService {
  constructor(private readonly repository: OAuthIAccessTokenRepository) {}

  async main(
    id: OAuthAccessTokenId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<OAuthAccessToken> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
