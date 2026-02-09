/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonIResourceRepository,
  CommonResource,
} from '@app/common/resource';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetResourcesService {
  constructor(private readonly repository: CommonIResourceRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonResource[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
