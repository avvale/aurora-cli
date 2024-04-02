/* eslint-disable key-spacing */
import { OAuthUpdateAndIncrementScopesCommand } from '@app/o-auth/scope';
import { OAuthUpdateAndIncrementScopesService } from '@app/o-auth/scope/application/update/o-auth-update-and-increment-scopes.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateAndIncrementScopesCommand)
export class OAuthUpdateAndIncrementScopesCommandHandler implements ICommandHandler<OAuthUpdateAndIncrementScopesCommand>
{
    constructor(
        private readonly updateScopesService: OAuthUpdateAndIncrementScopesService,
    ) {}

    async execute(command: OAuthUpdateAndIncrementScopesCommand): Promise<void>
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
