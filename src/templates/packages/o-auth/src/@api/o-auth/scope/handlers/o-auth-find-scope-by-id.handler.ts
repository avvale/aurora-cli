import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindScopeByIdQuery } from '@apps/o-auth/scope/application/find/find-scope-by-id.query';
import { OAuthScope } from '../../../../graphql';
import { OAuthScopeDto } from '../dto';

@Injectable()
export class OAuthFindScopeByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        return await this.queryBus.ask(new FindScopeByIdQuery(id, constraint, { timezone }));
    }
}