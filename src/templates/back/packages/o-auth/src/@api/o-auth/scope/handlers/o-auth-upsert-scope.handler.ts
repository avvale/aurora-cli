import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindScopeByIdQuery } from '@app/o-auth/scope/application/find/find-scope-by-id.query';
import { UpsertScopeCommand } from '@app/o-auth/scope/application/upsert/upsert-scope.command';
import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '../dto';

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
        await this.commandBus.dispatch(new UpsertScopeCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindScopeByIdQuery(
            payload.id,
            {},
            { timezone },
        ));
    }
}