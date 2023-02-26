import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindApplicationByIdQuery } from '@app/o-auth/application/application/find/find-application-by-id.query';
import { CreateApplicationCommand } from '@app/o-auth/application/application/create/create-application.command';
import { OAuthApplication, OAuthCreateApplicationInput } from '@api/graphql';
import { OAuthApplicationDto, OAuthCreateApplicationDto } from '../dto';

@Injectable()
export class OAuthCreateApplicationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateApplicationInput | OAuthCreateApplicationDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        await this.commandBus.dispatch(new CreateApplicationCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id, {}, { timezone }));
    }
}