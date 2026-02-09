/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateAdministrativeAreaLevel2Command {
  constructor(
    public readonly payload: {
      id: string;
      countryId: string;
      administrativeAreaLevel1Id: string;
      code: string;
      customCode?: string;
      name: string;
      slug: string;
      latitude?: number;
      longitude?: number;
      zoom?: number;
      mapType?: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN';
    },
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
