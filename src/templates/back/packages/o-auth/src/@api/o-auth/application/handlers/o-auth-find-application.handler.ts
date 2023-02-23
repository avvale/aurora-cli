import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindApplicationQuery } from '@app/o-auth/application/application/find/find-application.query';
import { OAuthApplication } from '@api/graphql';
import { OAuthApplicationDto } from '../dto';

@Injectable()
export class OAuthFindApplicationHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        return await this.queryBus.ask(new FindApplicationQuery(queryStatement, constraint, { timezone }));
    }
}