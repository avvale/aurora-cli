import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteClientByIdCommand } from './delete-client-by-id.command';
import { DeleteClientByIdService } from './delete-client-by-id.service';
import {
    ClientId
} from '../../domain/value-objects';

@CommandHandler(DeleteClientByIdCommand)
export class DeleteClientByIdCommandHandler implements ICommandHandler<DeleteClientByIdCommand>
{
    constructor(
        private readonly deleteClientByIdService: DeleteClientByIdService,
    ) {}

    async execute(command: DeleteClientByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteClientByIdService.main(
            new ClientId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}