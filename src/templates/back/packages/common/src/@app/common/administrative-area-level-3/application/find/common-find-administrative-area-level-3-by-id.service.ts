/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel3,
  CommonIAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3Id } from '@app/common/administrative-area-level-3/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAdministrativeAreaLevel3ByIdService {
  constructor(
    private readonly repository: CommonIAdministrativeAreaLevel3Repository,
  ) {}

  async main(
    id: CommonAdministrativeAreaLevel3Id,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAdministrativeAreaLevel3> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
