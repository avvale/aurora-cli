import {
  CommonIResourceRepository,
  CommonResource,
} from '@app/common/resource';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonRawSQLResourcesService {
  constructor(private readonly repository: CommonIResourceRepository) {}

  async main(
    rawSQL?: string,
    cQMetadata?: CQMetadata,
  ): Promise<CommonResource[]> {
    return await this.repository.rawSQL({
      rawSQL,
      cQMetadata,
    });
  }
}
