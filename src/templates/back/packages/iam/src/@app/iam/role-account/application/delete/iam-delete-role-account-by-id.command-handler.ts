import { IamDeleteRoleAccountByIdCommand } from '@app/iam/role-account';
import { IamDeleteRoleAccountByIdService } from '@app/iam/role-account/application/delete/iam-delete-role-account-by-id.service';
import {
  IamRoleAccountAccountId,
  IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteRoleAccountByIdCommand)
export class IamDeleteRoleAccountByIdCommandHandler
  implements ICommandHandler<IamDeleteRoleAccountByIdCommand>
{
  constructor(
    private readonly deleteRoleAccountByIdService: IamDeleteRoleAccountByIdService,
  ) {}

  async execute(command: IamDeleteRoleAccountByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteRoleAccountByIdService.main(
      new IamRoleAccountRoleId(command.roleId),
      new IamRoleAccountAccountId(command.accountId),
      command.constraint,
      command.cQMetadata,
    );
  }
}
