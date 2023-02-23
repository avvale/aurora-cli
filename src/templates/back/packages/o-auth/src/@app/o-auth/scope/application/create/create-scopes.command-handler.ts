/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateScopesCommand } from './create-scopes.command';
import { CreateScopesService } from './create-scopes.service';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateScopesCommand)
export class CreateScopesCommandHandler implements ICommandHandler<CreateScopesCommand>
{
    constructor(
        private readonly createScopesService: CreateScopesService,
    ) {}

    async execute(command: CreateScopesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createScopesService.main(
            command.payload
                .map(scope =>
                {
                    return {
                        id: new ScopeId(scope.id),
                        code: new ScopeCode(scope.code),
                        name: new ScopeName(scope.name),
                    };
                }),
            command.cQMetadata,
        );
    }
}