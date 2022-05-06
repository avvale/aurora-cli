import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindApplicationByIdQuery } from '@apps/o-auth/application/application/find/find-application-by-id.query';
import { UpdateApplicationCommand } from '@apps/o-auth/application/application/update/update-application.command';
import { OAuthApplication, OAuthUpdateApplicationInput } from '../../../../graphql';
import { OAuthApplicationDto, OAuthUpdateApplicationDto } from '../dto';

@Injectable()
export class OAuthUpdateApplicationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateApplicationInput | OAuthUpdateApplicationDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        await this.commandBus.dispatch(new UpdateApplicationCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id, constraint, { timezone }));
    }
}