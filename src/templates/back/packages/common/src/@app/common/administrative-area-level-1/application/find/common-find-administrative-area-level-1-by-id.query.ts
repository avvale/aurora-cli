/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonFindAdministrativeAreaLevel1ByIdQuery {
  constructor(
    public readonly id: string,
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
