import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionByIdCommand } from './delete-permission-by-id.command';
import { DeletePermissionByIdService } from './delete-permission-by-id.service';
import {
    PermissionId
} from '../../domain/value-objects';

@CommandHandler(DeletePermissionByIdCommand)
export class DeletePermissionByIdCommandHandler implements ICommandHandler<DeletePermissionByIdCommand>
{
    constructor(
        private readonly deletePermissionByIdService: DeletePermissionByIdService,
    ) {}

    async execute(command: DeletePermissionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionByIdService.main(
            new PermissionId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}