import { OAuthApplication } from '@api/graphql';
import { OAuthApplicationDto } from '@api/o-auth/application';
import { OAuthFindApplicationByIdQuery } from '@app/o-auth/application';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindApplicationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        return await this.queryBus.ask(new OAuthFindApplicationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
