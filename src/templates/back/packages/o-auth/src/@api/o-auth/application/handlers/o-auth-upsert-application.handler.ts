import { OAuthApplication, OAuthUpdateApplicationByIdInput } from '@api/graphql';
import { OAuthApplicationDto, OAuthUpdateApplicationByIdDto } from '@api/o-auth/application';
import { OAuthFindApplicationByIdQuery, OAuthUpsertApplicationCommand } from '@app/o-auth/application';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new OAuthUpsertApplicationCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new OAuthFindApplicationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
