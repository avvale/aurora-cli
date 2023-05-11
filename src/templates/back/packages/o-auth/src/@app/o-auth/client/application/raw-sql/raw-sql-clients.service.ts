import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { IClientRepository } from '../../domain/client.repository';
import { OAuthClient } from '../../domain/client.aggregate';

@Injectable()
export class RawSQLClientsService
{
    constructor(
        private readonly repository: IClientRepository,
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