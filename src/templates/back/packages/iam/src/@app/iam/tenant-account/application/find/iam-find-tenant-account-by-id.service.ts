import {
  IamITenantAccountRepository,
  IamTenantAccount,
} from '@app/iam/tenant-account';
import {
  IamTenantAccountAccountId,
  IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTenantAccountByIdService {
  constructor(private readonly repository: IamITenantAccountRepository) {}

  async main(
    tenantId: IamTenantAccountTenantId,
    accountId: IamTenantAccountAccountId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<IamTenantAccount> {
    return await this.repository.findById(undefined, {
      constraint,
      cQMetadata,
      findArguments: {
        tenantId: tenantId.value,
        accountId: accountId.value,
      },
    });
  }
}
