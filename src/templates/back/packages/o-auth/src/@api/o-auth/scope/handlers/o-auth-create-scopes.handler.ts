import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateScopesCommand } from '@app/o-auth/scope/application/create/create-scopes.command';
import { OAuthCreateScopeInput } from '@api/graphql';
import { OAuthCreateScopeDto } from '../dto';

@Injectable()
export class OAuthCreateScopesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateScopeInput[] | OAuthCreateScopeDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateScopesCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));
        return true;
    }
}