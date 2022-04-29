import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionsCommand } from './delete-permissions.command';
import { DeletePermissionsService } from './delete-permissions.service';

@CommandHandler(DeletePermissionsCommand)
export class DeletePermissionsCommandHandler implements ICommandHandler<DeletePermissionsCommand>
{
    constructor(
        private readonly deletePermissionsService: DeletePermissionsService,
    ) {}

    async execute(command: DeletePermissionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}