import { OAuthClient } from '@api/graphql';
import { OAuthClientDto } from '@api/o-auth/client';
import {
    OAuthDeleteClientByIdCommand,
    OAuthFindClientByIdQuery,
} from '@app/o-auth/client';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteClientByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthClient | OAuthClientDto> {
        const client = await this.queryBus.ask(
            new OAuthFindClientByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new OAuthDeleteClientByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return client;
    }
}
