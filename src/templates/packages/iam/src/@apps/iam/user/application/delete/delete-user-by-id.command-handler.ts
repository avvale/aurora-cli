import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserByIdCommand } from './delete-user-by-id.command';
import { DeleteUserByIdService } from './delete-user-by-id.service';
import {
    UserId
} from '../../domain/value-objects';

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdCommandHandler implements ICommandHandler<DeleteUserByIdCommand>
{
    constructor(
        private readonly deleteUserByIdService: DeleteUserByIdService,
    ) {}

    async execute(command: DeleteUserByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteUserByIdService.main(
            new UserId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}