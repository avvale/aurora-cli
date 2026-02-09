/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonFindLangByIdQuery {
  constructor(
    public readonly id: string,
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
