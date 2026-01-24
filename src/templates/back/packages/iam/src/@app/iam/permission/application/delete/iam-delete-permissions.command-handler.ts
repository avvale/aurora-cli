/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamDeletePermissionsCommand } from '@app/iam/permission';
import { IamDeletePermissionsService } from '@app/iam/permission/application/delete/iam-delete-permissions.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeletePermissionsCommand)
export class IamDeletePermissionsCommandHandler
  implements ICommandHandler<IamDeletePermissionsCommand>
{
  constructor(
    private readonly deletePermissionsService: IamDeletePermissionsService,
  ) {}

  async execute(command: IamDeletePermissionsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deletePermissionsService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
