import { IamDeleteUserByIdCommand } from '@app/iam/user';
import { IamDeleteUserByIdService } from '@app/iam/user/application/delete/iam-delete-user-by-id.service';
import { IamUserId } from '@app/iam/user/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteUserByIdCommand)
export class IamDeleteUserByIdCommandHandler
    implements ICommandHandler<IamDeleteUserByIdCommand>
{
    constructor(
        private readonly deleteUserByIdService: IamDeleteUserByIdService,
    ) {}

    async execute(command: IamDeleteUserByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteUserByIdService.main(
            new IamUserId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
