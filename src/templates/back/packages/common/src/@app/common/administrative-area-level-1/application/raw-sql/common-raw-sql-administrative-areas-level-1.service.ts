import {
  CommonAdministrativeAreaLevel1,
  CommonIAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonRawSQLAdministrativeAreasLevel1Service {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel1Repository,
  ) {}

  async main(
    rawSQL?: string,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAdministrativeAreaLevel1[]> {
    return await this.repository.rawSQL({
      rawSQL,
      cQMetadata,
    });
  }
}
