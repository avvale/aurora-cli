/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertScopeCommand } from './upsert-scope.command';
import { UpsertScopeService } from './upsert-scope.service';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertScopeCommand)
export class UpsertScopeCommandHandler implements ICommandHandler<UpsertScopeCommand>
{
    constructor(
        private readonly upsertScopeService: UpsertScopeService,
    ) {}

    async execute(command: UpsertScopeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertScopeService.main(
            {
                id: new ScopeId(command.payload.id),
                code: new ScopeCode(command.payload.code),
                name: new ScopeName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}