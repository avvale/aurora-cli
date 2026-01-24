import { IamIUserRepository } from '@app/iam/user';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCountUserService {
  constructor(private readonly repository: IamIUserRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<number> {
    return await this.repository.count({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
