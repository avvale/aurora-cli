import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteAccountsCommand } from './iam-delete-accounts.command';
import { IamDeleteAccountsService } from './iam-delete-accounts.service';

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
