/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateAdministrativeAreasLevel1Command {
  constructor(
    public readonly payload: {
      id: string;
      countryId: string;
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
