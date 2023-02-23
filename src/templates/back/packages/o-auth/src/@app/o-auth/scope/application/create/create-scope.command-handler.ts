/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateScopeCommand } from './create-scope.command';
import { CreateScopeService } from './create-scope.service';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateScopeCommand)
export class CreateScopeCommandHandler implements ICommandHandler<CreateScopeCommand>
{
    constructor(
        private readonly createScopeService: CreateScopeService,
    ) {}

    async execute(command: CreateScopeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createScopeService.main(
            {
                id: new ScopeId(command.payload.id),
                code: new ScopeCode(command.payload.code),
                name: new ScopeName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}