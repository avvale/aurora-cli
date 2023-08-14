import { OAuthCreateApplicationInput } from '@api/graphql';
import { OAuthCreateApplicationDto } from '@api/o-auth/application';
import { OAuthCreateApplicationsCommand } from '@app/o-auth/application';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthCreateApplicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateApplicationInput[] | OAuthCreateApplicationDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new OAuthCreateApplicationsCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return true;
    }
}
