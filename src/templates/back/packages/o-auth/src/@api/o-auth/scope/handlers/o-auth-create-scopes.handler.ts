import { OAuthCreateScopeInput } from '@api/graphql';
import { OAuthCreateScopeDto } from '@api/o-auth/scope';
import { OAuthCreateScopesCommand } from '@app/o-auth/scope';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new OAuthCreateScopesCommand(
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
