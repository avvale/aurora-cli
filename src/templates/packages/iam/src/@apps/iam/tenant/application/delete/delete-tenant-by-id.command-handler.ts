import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTenantByIdCommand } from './delete-tenant-by-id.command';
import { DeleteTenantByIdService } from './delete-tenant-by-id.service';
import {
    TenantId
} from '../../domain/value-objects';

@CommandHandler(DeleteTenantByIdCommand)
export class DeleteTenantByIdCommandHandler implements ICommandHandler<DeleteTenantByIdCommand>
{
    constructor(
        private readonly deleteTenantByIdService: DeleteTenantByIdService,
    ) {}

    async execute(command: DeleteTenantByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTenantByIdService.main(
            new TenantId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}