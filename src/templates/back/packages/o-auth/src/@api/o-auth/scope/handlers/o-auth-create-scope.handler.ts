import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindScopeByIdQuery } from '@app/o-auth/scope/application/find/find-scope-by-id.query';
import { CreateScopeCommand } from '@app/o-auth/scope/application/create/create-scope.command';
import { OAuthScope, OAuthCreateScopeInput } from '@api/graphql';
import { OAuthScopeDto, OAuthCreateScopeDto } from '../dto';

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
        await this.commandBus.dispatch(new CreateScopeCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindScopeByIdQuery(payload.id, {}, { timezone }));
    }
}