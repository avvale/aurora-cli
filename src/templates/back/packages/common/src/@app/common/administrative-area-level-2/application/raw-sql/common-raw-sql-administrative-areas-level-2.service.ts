import {
  CommonAdministrativeAreaLevel2,
  CommonIAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonRawSQLAdministrativeAreasLevel2Service {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel2Repository,
  ) {}

  async main(
    rawSQL?: string,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAdministrativeAreaLevel2[]> {
    return await this.repository.rawSQL({
      rawSQL,
      cQMetadata,
    });
  }
}
