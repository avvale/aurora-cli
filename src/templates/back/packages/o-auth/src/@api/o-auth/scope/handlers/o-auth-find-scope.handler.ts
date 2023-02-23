import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindScopeQuery } from '@app/o-auth/scope/application/find/find-scope.query';
import { OAuthScope } from '@api/graphql';
import { OAuthScopeDto } from '../dto';

@Injectable()
export class OAuthFindScopeHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        return await this.queryBus.ask(new FindScopeQuery(queryStatement, constraint, { timezone }));
    }
}