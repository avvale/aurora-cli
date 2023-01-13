import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

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
    ): Promise<OAuthApplication | OAuthApplicationDto>
    {
        await this.commandBus.dispatch(new UpdateApplicationByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id, constraint, { timezone }));
    }
}