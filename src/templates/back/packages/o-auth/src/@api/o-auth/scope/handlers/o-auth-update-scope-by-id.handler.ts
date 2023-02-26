import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// @app
import { FindScopeByIdQuery } from '@app/o-auth/scope/application/find/find-scope-by-id.query';
import { UpdateScopeByIdCommand } from '@app/o-auth/scope/application/update/update-scope-by-id.command';
import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        const scope = await this.queryBus.ask(new FindScopeByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, scope);

        await this.commandBus.dispatch(new UpdateScopeByIdCommand(
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

        return await this.queryBus.ask(new FindScopeByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));
    }
}