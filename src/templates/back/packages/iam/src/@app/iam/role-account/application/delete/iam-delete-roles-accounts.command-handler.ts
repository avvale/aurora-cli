import { IamDeleteRolesAccountsCommand } from '@app/iam/role-account';
import { IamDeleteRolesAccountsService } from '@app/iam/role-account/application/delete/iam-delete-roles-accounts.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteRolesAccountsCommand)
export class IamDeleteRolesAccountsCommandHandler
    implements ICommandHandler<IamDeleteRolesAccountsCommand>
{
    constructor(
        private readonly deleteRolesAccountsService: IamDeleteRolesAccountsService,
    ) {}

    async execute(command: IamDeleteRolesAccountsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteRolesAccountsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
