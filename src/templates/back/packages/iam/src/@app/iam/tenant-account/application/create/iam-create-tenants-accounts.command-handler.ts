/* eslint-disable key-spacing */
import { IamCreateTenantsAccountsCommand } from '@app/iam/tenant-account';
import { IamCreateTenantsAccountsService } from '@app/iam/tenant-account/application/create/iam-create-tenants-accounts.service';
import {
  IamTenantAccountAccountId,
  IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateTenantsAccountsCommand)
export class IamCreateTenantsAccountsCommandHandler
  implements ICommandHandler<IamCreateTenantsAccountsCommand>
{
  constructor(
    private readonly createTenantsAccountsService: IamCreateTenantsAccountsService,
  ) {}

  async execute(command: IamCreateTenantsAccountsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createTenantsAccountsService.main(
      command.payload.map((tenantAccount) => {
        return {
          tenantId: new IamTenantAccountTenantId(tenantAccount.tenantId),
          accountId: new IamTenantAccountAccountId(tenantAccount.accountId),
        };
      }),
      command.cQMetadata,
    );
  }
}
