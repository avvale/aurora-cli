import { OAuthApplicationClient } from '@api/graphql';
import { OAuthApplicationClientDto } from '@api/o-auth/application-client';
import { OAuthFindApplicationClientByIdQuery } from '@app/o-auth/application-client';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindApplicationClientByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        applicationId: string,
        clientId: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplicationClient | OAuthApplicationClientDto> {
        return await this.queryBus.ask(
            new OAuthFindApplicationClientByIdQuery(
                applicationId,
                clientId,
                constraint,
                {
                    timezone,
                },
            ),
        );
    }
}
