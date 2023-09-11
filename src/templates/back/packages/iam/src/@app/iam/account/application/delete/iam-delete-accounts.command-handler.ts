import { IamDeleteAccountsCommand } from '@app/iam/account';
import { IamDeleteAccountsService } from '@app/iam/account/application/delete/iam-delete-accounts.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteAccountsCommand)
export class IamDeleteAccountsCommandHandler implements ICommandHandler<IamDeleteAccountsCommand>
{
    constructor(
        private readonly deleteAccountsService: IamDeleteAccountsService,
    ) {}

    async execute(command: IamDeleteAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAccountsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
