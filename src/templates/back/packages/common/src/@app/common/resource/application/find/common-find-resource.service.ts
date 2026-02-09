/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonIResourceRepository,
  CommonResource,
} from '@app/common/resource';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindResourceService {
  constructor(private readonly repository: CommonIResourceRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonResource> {
    return await this.repository.find({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
