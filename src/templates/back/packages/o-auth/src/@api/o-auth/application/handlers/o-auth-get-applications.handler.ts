import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetApplicationsQuery } from '@app/o-auth/application/application/get/get-applications.query';
import { OAuthApplication } from '@api/graphql';
import { OAuthApplicationDto } from '../dto';

@Injectable()
export class OAuthGetApplicationsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication[] | OAuthApplicationDto[]>
    {
        return await this.queryBus.ask(new GetApplicationsQuery(queryStatement, constraint, { timezone }));
    }
}