import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetScopesQuery } from '@app/o-auth/scope/application/get/get-scopes.query';
import { DeleteScopesCommand } from '@app/o-auth/scope/application/delete/delete-scopes.command';
import { OAuthScope } from '@api/graphql';
import { OAuthScopeDto } from '../dto';

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
        const scopes = await this.queryBus.ask(new GetScopesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteScopesCommand(
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