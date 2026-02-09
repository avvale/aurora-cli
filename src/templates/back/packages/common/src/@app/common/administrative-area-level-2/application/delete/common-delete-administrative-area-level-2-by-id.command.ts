/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonDeleteAdministrativeAreaLevel2ByIdCommand {
  constructor(
    public readonly id: string,
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
