import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '@api/o-auth/scope';
import { OAuthFindScopeByIdQuery, OAuthUpsertScopeCommand } from '@app/o-auth/scope';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthUpsertScopeHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateScopeByIdInput | OAuthUpdateScopeByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        await this.commandBus.dispatch(new OAuthUpsertScopeCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new OAuthFindScopeByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
