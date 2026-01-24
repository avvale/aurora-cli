/* eslint-disable key-spacing */
import { IamUpdateTenantAccountByIdCommand } from '@app/iam/tenant-account';
import { IamUpdateTenantAccountByIdService } from '@app/iam/tenant-account/application/update/iam-update-tenant-account-by-id.service';
import {
  IamTenantAccountAccountId,
  IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateTenantAccountByIdCommand)
export class IamUpdateTenantAccountByIdCommandHandler
  implements ICommandHandler<IamUpdateTenantAccountByIdCommand>
{
  constructor(
    private readonly updateTenantAccountByIdService: IamUpdateTenantAccountByIdService,
  ) {}

  async execute(command: IamUpdateTenantAccountByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateTenantAccountByIdService.main(
      {
        tenantId: new IamTenantAccountTenantId(command.payload.tenantId),
        accountId: new IamTenantAccountAccountId(command.payload.accountId),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
