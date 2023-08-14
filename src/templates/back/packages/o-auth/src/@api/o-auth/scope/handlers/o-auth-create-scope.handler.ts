import { OAuthCreateScopeInput, OAuthScope } from '@api/graphql';
import { OAuthCreateScopeDto, OAuthScopeDto } from '@api/o-auth/scope';
import { OAuthCreateScopeCommand, OAuthFindScopeByIdQuery } from '@app/o-auth/scope';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthCreateScopeHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateScopeInput | OAuthCreateScopeDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        await this.commandBus.dispatch(new OAuthCreateScopeCommand(
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
