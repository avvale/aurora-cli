import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeleteRoleByIdCommand } from './iam-delete-role-by-id.command';
import { IamDeleteRoleByIdService } from './iam-delete-role-by-id.service';
import {
    IamRoleId
} from '../../domain/value-objects';

@CommandHandler(IamDeleteRoleByIdCommand)
export class IamDeleteRoleByIdCommandHandler implements ICommandHandler<IamDeleteRoleByIdCommand>
{
    constructor(
        private readonly deleteRoleByIdService: IamDeleteRoleByIdService,
    ) {}

    async execute(command: IamDeleteRoleByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteRoleByIdService.main(
            new IamRoleId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
