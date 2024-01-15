/* eslint-disable key-spacing */
import { OAuthUpdateScopesCommand } from '@app/o-auth/scope';
import { OAuthUpdateScopesService } from '@app/o-auth/scope/application/update/o-auth-update-scopes.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateScopesCommand)
export class OAuthUpdateScopesCommandHandler implements ICommandHandler<OAuthUpdateScopesCommand>
{
    constructor(
        private readonly updateScopesService: OAuthUpdateScopesService,
    ) {}

    async execute(command: OAuthUpdateScopesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateScopesService.main(
            {
                id: new OAuthScopeId(command.payload.id, { undefinable: true }),
                code: new OAuthScopeCode(command.payload.code, { undefinable: true }),
                name: new OAuthScopeName(command.payload.name, { undefinable: true }),
                roleIds: new OAuthScopeRoleIds(command.payload.roleIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
