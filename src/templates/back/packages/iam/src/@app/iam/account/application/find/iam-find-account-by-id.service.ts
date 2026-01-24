import { IamAccount, IamIAccountRepository } from '@app/iam/account';
import { IamAccountId } from '@app/iam/account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindAccountByIdService {
  constructor(private readonly repository: IamIAccountRepository) {}

  async main(
    id: IamAccountId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<IamAccount> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
