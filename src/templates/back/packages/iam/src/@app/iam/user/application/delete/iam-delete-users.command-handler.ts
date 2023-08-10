import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteUsersCommand } from './iam-delete-users.command';
import { IamDeleteUsersService } from './iam-delete-users.service';

@CommandHandler(IamDeleteUsersCommand)
export class IamDeleteUsersCommandHandler implements ICommandHandler<IamDeleteUsersCommand>
{
    constructor(
        private readonly deleteUsersService: IamDeleteUsersService,
    ) {}

    async execute(command: IamDeleteUsersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteUsersService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
