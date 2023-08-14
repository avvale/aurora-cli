import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteUserByIdCommand } from './iam-delete-user-by-id.command';
import { IamDeleteUserByIdService } from './iam-delete-user-by-id.service';
import {
    IamUserId
} from '../../domain/value-objects';

@CommandHandler(IamDeleteUserByIdCommand)
export class IamDeleteUserByIdCommandHandler implements ICommandHandler<IamDeleteUserByIdCommand>
{
    constructor(
        private readonly deleteUserByIdService: IamDeleteUserByIdService,
    ) {}

    async execute(command: IamDeleteUserByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteUserByIdService.main(
            new IamUserId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
