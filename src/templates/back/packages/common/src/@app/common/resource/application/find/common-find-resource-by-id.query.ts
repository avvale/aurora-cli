/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonFindResourceByIdQuery {
  constructor(
    public readonly id: string,
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
