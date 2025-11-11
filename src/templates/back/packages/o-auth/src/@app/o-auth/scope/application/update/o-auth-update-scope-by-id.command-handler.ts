/* eslint-disable key-spacing */
import { OAuthUpdateScopeByIdCommand } from '@app/o-auth/scope';
import { OAuthUpdateScopeByIdService } from '@app/o-auth/scope/application/update/o-auth-update-scope-by-id.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateScopeByIdCommand)
export class OAuthUpdateScopeByIdCommandHandler
    implements ICommandHandler<OAuthUpdateScopeByIdCommand>
{
    constructor(
        private readonly updateScopeByIdService: OAuthUpdateScopeByIdService,
    ) {}

    async execute(command: OAuthUpdateScopeByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateScopeByIdService.main(
            {
                id: new OAuthScopeId(command.payload.id),
                code: new OAuthScopeCode(command.payload.code, {
                    undefinable: true,
                }),
                name: new OAuthScopeName(command.payload.name, {
                    undefinable: true,
                }),
                roleIds: new OAuthScopeRoleIds(command.payload.roleIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
