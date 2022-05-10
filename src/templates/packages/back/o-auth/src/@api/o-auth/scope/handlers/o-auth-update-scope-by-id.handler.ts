import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindScopeByIdQuery } from '@apps/o-auth/scope/application/find/find-scope-by-id.query';
import { UpdateScopeByIdCommand } from '@apps/o-auth/scope/application/update/update-scope-by-id.command';
import { OAuthScope, OAuthUpdateScopeByIdInput } from '../../../../graphql';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '../dto';

@Injectable()
export class OAuthUpdateScopeByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateScopeByIdInput | OAuthUpdateScopeByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        await this.commandBus.dispatch(new UpdateScopeByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindScopeByIdQuery(payload.id, constraint, { timezone }));
    }
}