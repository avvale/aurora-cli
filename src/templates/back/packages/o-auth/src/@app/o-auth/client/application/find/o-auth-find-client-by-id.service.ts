import { OAuthClient, OAuthIClientRepository } from '@app/o-auth/client';
import { OAuthClientId } from '@app/o-auth/client/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindClientByIdService {
    constructor(private readonly repository: OAuthIClientRepository) {}

    async main(
        id: OAuthClientId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthClient> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
