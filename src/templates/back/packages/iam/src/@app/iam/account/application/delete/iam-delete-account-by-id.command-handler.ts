import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteAccountByIdCommand } from './iam-delete-account-by-id.command';
import { IamDeleteAccountByIdService } from './iam-delete-account-by-id.service';
import {
    IamAccountId
} from '../../domain/value-objects';

@CommandHandler(IamDeleteAccountByIdCommand)
export class IamDeleteAccountByIdCommandHandler implements ICommandHandler<IamDeleteAccountByIdCommand>
{
    constructor(
        private readonly deleteAccountByIdService: IamDeleteAccountByIdService,
    ) {}

    async execute(command: IamDeleteAccountByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAccountByIdService.main(
            new IamAccountId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
