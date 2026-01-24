import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  IamCreateTenantsAccountsCommand,
  iamMockTenantAccountData,
} from '@app/iam/tenant-account';

@Injectable()
export class IamTenantAccountSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new IamCreateTenantsAccountsCommand(iamMockTenantAccountData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
