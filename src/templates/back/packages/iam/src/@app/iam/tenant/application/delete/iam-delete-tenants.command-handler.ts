import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteTenantsCommand } from './iam-delete-tenants.command';
import { IamDeleteTenantsService } from './iam-delete-tenants.service';

@CommandHandler(IamDeleteTenantsCommand)
export class IamDeleteTenantsCommandHandler implements ICommandHandler<IamDeleteTenantsCommand>
{
    constructor(
        private readonly deleteTenantsService: IamDeleteTenantsService,
    ) {}

    async execute(command: IamDeleteTenantsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTenantsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
