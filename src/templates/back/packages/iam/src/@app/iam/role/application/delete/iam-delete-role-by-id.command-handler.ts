import { IamDeleteRoleByIdCommand } from '@app/iam/role';
import { IamDeleteRoleByIdService } from '@app/iam/role/application/delete/iam-delete-role-by-id.service';
import { IamRoleId } from '@app/iam/role/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteRoleByIdCommand)
export class IamDeleteRoleByIdCommandHandler
    implements ICommandHandler<IamDeleteRoleByIdCommand>
{
    constructor(
        private readonly deleteRoleByIdService: IamDeleteRoleByIdService,
    ) {}

    async execute(command: IamDeleteRoleByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteRoleByIdService.main(
            new IamRoleId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
