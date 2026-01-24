import { IamDeleteTenantsCommand } from '@app/iam/tenant';
import { IamDeleteTenantsService } from '@app/iam/tenant/application/delete/iam-delete-tenants.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamDeleteTenantsCommand)
export class IamDeleteTenantsCommandHandler
  implements ICommandHandler<IamDeleteTenantsCommand>
{
  constructor(private readonly deleteTenantsService: IamDeleteTenantsService) {}

  async execute(command: IamDeleteTenantsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteTenantsService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
