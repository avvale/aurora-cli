import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamDeletePermissionByIdCommand } from './iam-delete-permission-by-id.command';
import { IamDeletePermissionByIdService } from './iam-delete-permission-by-id.service';
import {
    IamPermissionId
} from '../../domain/value-objects';

@CommandHandler(IamDeletePermissionByIdCommand)
export class IamDeletePermissionByIdCommandHandler implements ICommandHandler<IamDeletePermissionByIdCommand>
{
    constructor(
        private readonly deletePermissionByIdService: IamDeletePermissionByIdService,
    ) {}

    async execute(command: IamDeletePermissionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deletePermissionByIdService.main(
            new IamPermissionId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
