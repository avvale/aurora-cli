/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonUpdateAdministrativeAreaLevel2ByIdCommand {
  constructor(
    public readonly payload: {
      id: string;
      countryId?: string;
      administrativeAreaLevel1Id?: string;
      code?: string;
      customCode?: string;
      name?: string;
      slug?: string;
      latitude?: number;
      longitude?: number;
      zoom?: number;
      mapType?: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN';
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
