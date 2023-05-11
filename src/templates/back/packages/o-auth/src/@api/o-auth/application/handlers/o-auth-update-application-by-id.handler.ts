import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';

// @app
import { FindApplicationByIdQuery } from '@app/o-auth/application/application/find/find-application-by-id.query';
import { UpdateApplicationByIdCommand } from '@app/o-auth/application/application/update/update-application-by-id.command';
import { OAuthApplication, OAuthUpdateApplicationByIdInput } from '@api/graphql';
import { OAuthApplicationDto, OAuthUpdateApplicationByIdDto } from '../dto';

@Injectable()
export class OAuthUpdateApplicationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateApplicationByIdInput | OAuthUpdateApplicationByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        const application = await this.queryBus.ask(new FindApplicationByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, application);

        await this.commandBus.dispatch(new UpdateApplicationByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindApplicationByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));
    }
}