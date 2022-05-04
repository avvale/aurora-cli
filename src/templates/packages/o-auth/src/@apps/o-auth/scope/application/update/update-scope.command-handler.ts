/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateScopeCommand } from './update-scope.command';
import { UpdateScopeService } from './update-scope.service';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateScopeCommand)
export class UpdateScopeCommandHandler implements ICommandHandler<UpdateScopeCommand>
{
    constructor(
        private readonly updateScopeService: UpdateScopeService,
    ) {}

    async execute(command: UpdateScopeCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateScopeService.main(
            {
                id: new ScopeId(command.payload.id),
                code: new ScopeCode(command.payload.code, { undefinable: true }),
                name: new ScopeName(command.payload.name, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}