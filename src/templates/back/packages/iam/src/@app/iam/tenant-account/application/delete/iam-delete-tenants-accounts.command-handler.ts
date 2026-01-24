import { IamDeleteTenantsAccountsCommand } from '@app/iam/tenant-account';
import { IamDeleteTenantsAccountsService } from '@app/iam/tenant-account/application/delete/iam-delete-tenants-accounts.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteTenantsAccountsCommand)
export class IamDeleteTenantsAccountsCommandHandler
  implements ICommandHandler<IamDeleteTenantsAccountsCommand>
{
  constructor(
    private readonly deleteTenantsAccountsService: IamDeleteTenantsAccountsService,
  ) {}

  async execute(command: IamDeleteTenantsAccountsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteTenantsAccountsService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
