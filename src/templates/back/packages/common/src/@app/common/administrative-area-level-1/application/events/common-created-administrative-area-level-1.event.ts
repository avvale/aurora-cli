/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreatedAdministrativeAreaLevel1Event {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        countryId: string;
        code: string;
        customCode: string;
        name: string;
        slug: string;
        latitude: number;
        longitude: number;
        zoom: number;
        mapType: 'ROADMAP' | 'SATELLITE' | 'HYBRID' | 'TERRAIN';
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
