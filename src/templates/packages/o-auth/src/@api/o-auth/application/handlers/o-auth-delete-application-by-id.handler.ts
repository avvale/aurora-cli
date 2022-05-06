import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindApplicationByIdQuery } from '../../../../@apps/o-auth/application/application/find/find-application-by-id.query';
import { DeleteApplicationByIdCommand } from '../../../../@apps/o-auth/application/application/delete/delete-application-by-id.command';
import { OAuthApplication } from '../../../../graphql';
import { OAuthApplicationDto } from '../dto';

@Injectable()
export class OAuthDeleteApplicationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        const application = await this.queryBus.ask(new FindApplicationByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteApplicationByIdCommand(id, constraint, { timezone }));

        return application;
    }
}