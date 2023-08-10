import { OAuthApplication } from '@api/graphql';
import { OAuthApplicationDto } from '@api/o-auth/application';
import { OAuthFindApplicationQuery } from '@app/o-auth/application';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new OAuthFindApplicationQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
