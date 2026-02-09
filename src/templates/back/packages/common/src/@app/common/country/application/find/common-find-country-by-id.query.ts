/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonFindCountryByIdQuery {
  constructor(
    public readonly id: string,
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
