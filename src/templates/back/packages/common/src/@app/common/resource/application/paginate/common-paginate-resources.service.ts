/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonIResourceRepository,
  CommonResource,
} from '@app/common/resource';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateResourcesService {
  constructor(private readonly repository: CommonIResourceRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<CommonResource>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
