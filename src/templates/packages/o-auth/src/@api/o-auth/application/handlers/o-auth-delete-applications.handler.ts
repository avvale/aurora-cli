import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetApplicationsQuery } from '../../../../@apps/o-auth/application/application/get/get-applications.query';
import { DeleteApplicationsCommand } from '../../../../@apps/o-auth/application/application/delete/delete-applications.command';
import { OAuthApplication } from '../../../../graphql';
import { OAuthApplicationDto } from '../dto';

@Injectable()
export class OAuthDeleteApplicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication[] | OAuthApplicationDto[]>
    {
        const applications = await this.queryBus.ask(new GetApplicationsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteApplicationsCommand(queryStatement, constraint, { timezone }));

        return applications;
    }
}