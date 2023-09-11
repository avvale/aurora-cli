import { IamDeleteAccountByIdCommand } from '@app/iam/account';
import { IamDeleteAccountByIdService } from '@app/iam/account/application/delete/iam-delete-account-by-id.service';
import { IamAccountId } from '@app/iam/account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
