/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateScopeByIdCommand } from './update-scope-by-id.command';
import { UpdateScopeByIdService } from './update-scope-by-id.service';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateScopeByIdCommand)
export class UpdateScopeByIdCommandHandler implements ICommandHandler<UpdateScopeByIdCommand>
{
    constructor(
        private readonly updateScopeByIdService: UpdateScopeByIdService,
    ) {}

    async execute(command: UpdateScopeByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateScopeByIdService.main(
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