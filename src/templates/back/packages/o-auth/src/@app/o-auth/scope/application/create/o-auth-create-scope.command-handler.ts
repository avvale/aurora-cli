/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthCreateScopeCommand } from './o-auth-create-scope.command';
import { OAuthCreateScopeService } from './o-auth-create-scope.service';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(OAuthCreateScopeCommand)
export class OAuthCreateScopeCommandHandler implements ICommandHandler<OAuthCreateScopeCommand>
{
    constructor(
        private readonly createScopeService: OAuthCreateScopeService,
    ) {}

    async execute(command: OAuthCreateScopeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createScopeService.main(
            {
                id: new OAuthScopeId(command.payload.id),
                code: new OAuthScopeCode(command.payload.code),
                name: new OAuthScopeName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}
