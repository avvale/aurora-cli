import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteScopeByIdCommand } from './delete-scope-by-id.command';
import { DeleteScopeByIdService } from './delete-scope-by-id.service';
import {
    ScopeId
} from '../../domain/value-objects';

@CommandHandler(DeleteScopeByIdCommand)
export class DeleteScopeByIdCommandHandler implements ICommandHandler<DeleteScopeByIdCommand>
{
    constructor(
        private readonly deleteScopeByIdService: DeleteScopeByIdService,
    ) {}

    async execute(command: DeleteScopeByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteScopeByIdService.main(
            new ScopeId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}