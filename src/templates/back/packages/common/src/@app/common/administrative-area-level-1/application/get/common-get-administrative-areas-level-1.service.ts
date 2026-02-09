/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1,
  CommonIAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetAdministrativeAreasLevel1Service {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel1Repository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAdministrativeAreaLevel1[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
