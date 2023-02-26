import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurora-ts/core';
import { IClientRepository } from '../../domain/client.repository';
import { OAuthClient } from '../../domain/client.aggregate';
import { ClientId } from '../../domain/value-objects';

@Injectable()
export class FindClientByIdService
{
    constructor(
        private readonly repository: IClientRepository,
    ) {}

    async main(
        id: ClientId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthClient>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}