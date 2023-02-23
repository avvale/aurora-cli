/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateScopesCommand } from './update-scopes.command';
import { UpdateScopesService } from './update-scopes.service';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateScopesCommand)
export class UpdateScopesCommandHandler implements ICommandHandler<UpdateScopesCommand>
{
    constructor(
        private readonly updateScopesService: UpdateScopesService,
    ) {}

    async execute(command: UpdateScopesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateScopesService.main(
            {
                id: new ScopeId(command.payload.id, { undefinable: true }),
                code: new ScopeCode(command.payload.code, { undefinable: true }),
                name: new ScopeName(command.payload.name, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}