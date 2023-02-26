import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetScopesQuery } from '@app/o-auth/scope/application/get/get-scopes.query';
import { UpdateScopesCommand } from '@app/o-auth/scope/application/update/update-scopes.command';
import { OAuthScope, OAuthUpdateScopesInput } from '@api/graphql';
import { OAuthScopeDto, OAuthUpdateScopesDto } from '../dto';

@Injectable()
export class OAuthUpdateScopesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateScopesInput | OAuthUpdateScopesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        await this.commandBus.dispatch(new UpdateScopesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new GetScopesQuery(queryStatement, constraint, { timezone }));
    }
}