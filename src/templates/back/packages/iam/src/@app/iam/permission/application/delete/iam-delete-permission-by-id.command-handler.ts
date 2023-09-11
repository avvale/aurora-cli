import { IamDeletePermissionByIdCommand } from '@app/iam/permission';
import { IamDeletePermissionByIdService } from '@app/iam/permission/application/delete/iam-delete-permission-by-id.service';
import { IamPermissionId } from '@app/iam/permission/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
