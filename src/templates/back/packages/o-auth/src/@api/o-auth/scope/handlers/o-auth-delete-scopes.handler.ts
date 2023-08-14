import { OAuthScope } from '@api/graphql';
import { OAuthScopeDto } from '@api/o-auth/scope';
import { OAuthDeleteScopesCommand, OAuthGetScopesQuery } from '@app/o-auth/scope';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteScopesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthScope[] | OAuthScopeDto[]>
    {
        const scopes = await this.queryBus.ask(new OAuthGetScopesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new OAuthDeleteScopesCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return scopes;
    }
}
