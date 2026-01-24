import {
  CommonAdministrativeAreaLevel3,
  CommonIAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAdministrativeAreaLevel3Service {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel3Repository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAdministrativeAreaLevel3> {
    return await this.repository.find({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
