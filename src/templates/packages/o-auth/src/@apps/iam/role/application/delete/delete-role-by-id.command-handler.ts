import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleByIdCommand } from './delete-role-by-id.command';
import { DeleteRoleByIdService } from './delete-role-by-id.service';
import {
    RoleId
} from '../../domain/value-objects';

@CommandHandler(DeleteRoleByIdCommand)
export class DeleteRoleByIdCommandHandler implements ICommandHandler<DeleteRoleByIdCommand>
{
    constructor(
        private readonly deleteRoleByIdService: DeleteRoleByIdService,
    ) {}

    async execute(command: DeleteRoleByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteRoleByIdService.main(
            new RoleId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}