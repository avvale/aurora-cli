import { OAuthApplication } from '@api/graphql';
import { OAuthApplicationDto } from '@api/o-auth/application';
import { OAuthGetApplicationsQuery } from '@app/o-auth/application';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new OAuthGetApplicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
