import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteRolesCommand } from './iam-delete-roles.command';
import { IamDeleteRolesService } from './iam-delete-roles.service';

@CommandHandler(IamDeleteRolesCommand)
export class IamDeleteRolesCommandHandler implements ICommandHandler<IamDeleteRolesCommand>
{
    constructor(
        private readonly deleteRolesService: IamDeleteRolesService,
    ) {}

    async execute(command: IamDeleteRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteRolesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
