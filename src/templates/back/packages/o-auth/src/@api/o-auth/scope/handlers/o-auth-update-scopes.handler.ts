import { OAuthScope, OAuthUpdateScopesInput } from '@api/graphql';
import { OAuthScopeDto, OAuthUpdateScopesDto } from '@api/o-auth/scope';
import { OAuthGetScopesQuery, OAuthUpdateScopesCommand } from '@app/o-auth/scope';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new OAuthUpdateScopesCommand(
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

        return await this.queryBus.ask(new OAuthGetScopesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
