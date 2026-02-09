/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2,
  CommonIAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel2Service {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel2Repository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<CommonAdministrativeAreaLevel2>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
