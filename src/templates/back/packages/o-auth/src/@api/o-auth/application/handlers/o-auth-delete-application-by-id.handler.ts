import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindApplicationByIdQuery } from '@app/o-auth/application/application/find/find-application-by-id.query';
import { DeleteApplicationByIdCommand } from '@app/o-auth/application/application/delete/delete-application-by-id.command';
import { OAuthApplication } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        const application = await this.queryBus.ask(new FindApplicationByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteApplicationByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return application;
    }
}