import { IamDeleteRolesCommand } from '@app/iam/role';
import { IamDeleteRolesService } from '@app/iam/role/application/delete/iam-delete-roles.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteRolesCommand)
export class IamDeleteRolesCommandHandler
    implements ICommandHandler<IamDeleteRolesCommand>
{
    constructor(private readonly deleteRolesService: IamDeleteRolesService) {}

    async execute(command: IamDeleteRolesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteRolesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
