import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IClientRepository } from '../../domain/client.repository';
import { OAuthClient } from '../../domain/client.aggregate';

@Injectable()
export class GetClientsService
{
    constructor(
        private readonly repository: IClientRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthClient[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}