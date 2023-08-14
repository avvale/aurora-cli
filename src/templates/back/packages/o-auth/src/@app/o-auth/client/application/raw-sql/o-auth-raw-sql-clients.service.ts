import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIClientRepository } from '../../domain/o-auth-client.repository';
import { OAuthClient } from '../../domain/o-auth-client.aggregate';

@Injectable()
export class OAuthRawSQLClientsService
{
    constructor(
        private readonly repository: OAuthIClientRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthClient[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
