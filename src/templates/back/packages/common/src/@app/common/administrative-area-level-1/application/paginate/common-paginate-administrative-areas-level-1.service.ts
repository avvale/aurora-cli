/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1,
  CommonIAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel1Service {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel1Repository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<CommonAdministrativeAreaLevel1>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
