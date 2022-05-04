import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTenantsCommand } from './delete-tenants.command';
import { DeleteTenantsService } from './delete-tenants.service';

@CommandHandler(DeleteTenantsCommand)
export class DeleteTenantsCommandHandler implements ICommandHandler<DeleteTenantsCommand>
{
    constructor(
        private readonly deleteTenantsService: DeleteTenantsService,
    ) {}

    async execute(command: DeleteTenantsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTenantsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}