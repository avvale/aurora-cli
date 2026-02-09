/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2,
  CommonIAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetAdministrativeAreasLevel2Service {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel2Repository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAdministrativeAreaLevel2[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
