/* eslint-disable key-spacing */
import { OAuthUpsertScopeCommand } from '@app/o-auth/scope';
import { OAuthUpsertScopeService } from '@app/o-auth/scope/application/upsert/o-auth-upsert-scope.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpsertScopeCommand)
export class OAuthUpsertScopeCommandHandler implements ICommandHandler<OAuthUpsertScopeCommand>
{
    constructor(
        private readonly upsertScopeService: OAuthUpsertScopeService,
    ) {}

    async execute(command: OAuthUpsertScopeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertScopeService.main(
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
