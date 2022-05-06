import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRolesCommand } from './delete-roles.command';
import { DeleteRolesService } from './delete-roles.service';

@CommandHandler(DeleteRolesCommand)
export class DeleteRolesCommandHandler implements ICommandHandler<DeleteRolesCommand>
{
    constructor(
        private readonly deleteRolesService: DeleteRolesService,
    ) {}

    async execute(command: DeleteRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteRolesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}