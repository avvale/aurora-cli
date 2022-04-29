import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAccountByIdCommand } from './delete-account-by-id.command';
import { DeleteAccountByIdService } from './delete-account-by-id.service';
import {
    AccountId
} from '../../domain/value-objects';

@CommandHandler(DeleteAccountByIdCommand)
export class DeleteAccountByIdCommandHandler implements ICommandHandler<DeleteAccountByIdCommand>
{
    constructor(
        private readonly deleteAccountByIdService: DeleteAccountByIdService,
    ) {}

    async execute(command: DeleteAccountByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAccountByIdService.main(
            new AccountId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}