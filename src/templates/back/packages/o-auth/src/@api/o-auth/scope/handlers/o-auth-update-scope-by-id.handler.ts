import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '@api/o-auth/scope';
import { OAuthFindScopeByIdQuery, OAuthUpdateScopeByIdCommand } from '@app/o-auth/scope';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, diff } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        const scope = await this.queryBus.ask(new OAuthFindScopeByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, scope);

        if ('roleIds' in dataToUpdate) dataToUpdate.roleIds = payload.roleIds;

        await this.commandBus.dispatch(new OAuthUpdateScopeByIdCommand(
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

        return await this.queryBus.ask(new OAuthFindScopeByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
