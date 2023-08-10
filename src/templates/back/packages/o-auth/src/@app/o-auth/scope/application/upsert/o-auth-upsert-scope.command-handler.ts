/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthUpsertScopeCommand } from './o-auth-upsert-scope.command';
import { OAuthUpsertScopeService } from './o-auth-upsert-scope.service';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '../../domain/value-objects';

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
            },
            command.cQMetadata,
        );
    }
}
