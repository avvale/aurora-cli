import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUsersCommand } from './delete-users.command';
import { DeleteUsersService } from './delete-users.service';

@CommandHandler(DeleteUsersCommand)
export class DeleteUsersCommandHandler implements ICommandHandler<DeleteUsersCommand>
{
    constructor(
        private readonly deleteUsersService: DeleteUsersService,
    ) {}

    async execute(command: DeleteUsersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteUsersService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}