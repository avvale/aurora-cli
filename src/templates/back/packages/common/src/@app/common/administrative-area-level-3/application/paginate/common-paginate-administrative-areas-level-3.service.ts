import {
  CommonAdministrativeAreaLevel3,
  CommonIAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel3Service {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel3Repository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<CommonAdministrativeAreaLevel3>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
