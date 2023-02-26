import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindApplicationByIdQuery } from '@app/o-auth/application/application/find/find-application-by-id.query';
import { UpsertApplicationCommand } from '@app/o-auth/application/application/upsert/upsert-application.command';
import { OAuthApplication, OAuthUpdateApplicationByIdInput } from '@api/graphql';
import { OAuthApplicationDto, OAuthUpdateApplicationByIdDto } from '../dto';

@Injectable()
export class OAuthUpsertApplicationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateApplicationByIdInput | OAuthUpdateApplicationByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        await this.commandBus.dispatch(new UpsertApplicationCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindApplicationByIdQuery(
            payload.id,
            {},
            { timezone },
        ));
    }
}