/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateAdministrativeAreasLevel3Command {
  constructor(
    public readonly payload: {
      id: string;
      countryId: string;
      administrativeAreaLevel1Id: string;
      administrativeAreaLevel2Id: string;
      code: string;
      customCode?: string;
      name: string;
      slug: string;
      latitude?: number;
      longitude?: number;
      zoom?: number;
      mapType?: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN';
    }[],
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
