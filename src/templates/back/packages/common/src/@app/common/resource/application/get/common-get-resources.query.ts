/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonGetResourcesQuery {
  constructor(
    public readonly queryStatement?: QueryStatement,
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
