import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindApplicationByIdQuery } from '@app/o-auth/application/application/find/find-application-by-id.query';
import { OAuthApplication } from '@api/graphql';
import { OAuthApplicationDto } from '../dto';

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
        return await this.queryBus.ask(new FindApplicationByIdQuery(id, constraint, { timezone }));
    }
}