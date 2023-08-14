import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeletePermissionsCommand } from './iam-delete-permissions.command';
import { IamDeletePermissionsService } from './iam-delete-permissions.service';

@CommandHandler(IamDeletePermissionsCommand)
export class IamDeletePermissionsCommandHandler implements ICommandHandler<IamDeletePermissionsCommand>
{
    constructor(
        private readonly deletePermissionsService: IamDeletePermissionsService,
    ) {}

    async execute(command: IamDeletePermissionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
