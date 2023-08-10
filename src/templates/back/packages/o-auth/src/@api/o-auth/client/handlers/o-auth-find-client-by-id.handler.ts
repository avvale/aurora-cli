import { OAuthClient } from '@api/graphql';
import { OAuthClientDto } from '@api/o-auth/client';
import { OAuthFindClientByIdQuery } from '@app/o-auth/client';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindClientByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient | OAuthClientDto>
    {
        return await this.queryBus.ask(new OAuthFindClientByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
