import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetApplicationsQuery } from '@app/o-auth/application/application/get/get-applications.query';
import { UpdateApplicationsCommand } from '@app/o-auth/application/application/update/update-applications.command';
import { OAuthApplication, OAuthUpdateApplicationsInput } from '@api/graphql';
import { OAuthApplicationDto, OAuthUpdateApplicationsDto } from '../dto';

@Injectable()
export class OAuthUpdateApplicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateApplicationsInput | OAuthUpdateApplicationsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        await this.commandBus.dispatch(new UpdateApplicationsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new GetApplicationsQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}