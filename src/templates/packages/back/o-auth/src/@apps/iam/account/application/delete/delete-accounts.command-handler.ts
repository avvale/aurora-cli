import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAccountsCommand } from './delete-accounts.command';
import { DeleteAccountsService } from './delete-accounts.service';

@CommandHandler(DeleteAccountsCommand)
export class DeleteAccountsCommandHandler implements ICommandHandler<DeleteAccountsCommand>
{
    constructor(
        private readonly deleteAccountsService: DeleteAccountsService,
    ) {}

    async execute(command: DeleteAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAccountsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}