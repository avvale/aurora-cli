import { IamDeletePermissionsRolesCommand } from '@app/iam/permission-role';
import { IamDeletePermissionsRolesService } from '@app/iam/permission-role/application/delete/iam-delete-permissions-roles.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeletePermissionsRolesCommand)
export class IamDeletePermissionsRolesCommandHandler implements ICommandHandler<IamDeletePermissionsRolesCommand>
{
    constructor(
        private readonly deletePermissionsRolesService: IamDeletePermissionsRolesService,
    ) {}

    async execute(command: IamDeletePermissionsRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionsRolesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
