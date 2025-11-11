import { IamDeleteUsersCommand } from '@app/iam/user';
import { IamDeleteUsersService } from '@app/iam/user/application/delete/iam-delete-users.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteUsersCommand)
export class IamDeleteUsersCommandHandler
    implements ICommandHandler<IamDeleteUsersCommand>
{
    constructor(private readonly deleteUsersService: IamDeleteUsersService) {}

    async execute(command: IamDeleteUsersCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteUsersService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
