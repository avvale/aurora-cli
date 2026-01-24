import { IamCreateTenantInput } from '@api/graphql';
import { IamCreateTenantDto } from '@api/iam/tenant';
import { IamCreateTenantsCommand } from '@app/iam/tenant';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateTenantsHandler {
  constructor(private readonly commandBus: ICommandBus) {}

  async main(
    payload: IamCreateTenantInput[] | IamCreateTenantDto[],
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    await this.commandBus.dispatch(
      new IamCreateTenantsCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return true;
  }
}
