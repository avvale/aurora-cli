import { OAuthApplication, OAuthUpdateApplicationsInput } from '@api/graphql';
import { OAuthApplicationDto, OAuthUpdateApplicationsDto } from '@api/o-auth/application';
import { OAuthGetApplicationsQuery, OAuthUpdateApplicationsCommand } from '@app/o-auth/application';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new OAuthUpdateApplicationsCommand(
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

        return await this.queryBus.ask(new OAuthGetApplicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
