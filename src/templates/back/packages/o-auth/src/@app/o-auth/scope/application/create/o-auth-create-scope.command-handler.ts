/* eslint-disable key-spacing */
import { OAuthCreateScopeCommand } from '@app/o-auth/scope';
import { OAuthCreateScopeService } from '@app/o-auth/scope/application/create/o-auth-create-scope.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthCreateScopeCommand)
export class OAuthCreateScopeCommandHandler
    implements ICommandHandler<OAuthCreateScopeCommand>
{
    constructor(private readonly createScopeService: OAuthCreateScopeService) {}

    async execute(command: OAuthCreateScopeCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createScopeService.main(
            {
                id: new OAuthScopeId(command.payload.id),
                code: new OAuthScopeCode(command.payload.code),
                name: new OAuthScopeName(command.payload.name),
                roleIds: new OAuthScopeRoleIds(command.payload.roleIds),
            },
            command.cQMetadata,
        );
    }
}
