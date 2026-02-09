/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonDeletedAdministrativeAreaLevel2Event {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        countryId: string;
        administrativeAreaLevel1Id: string;
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
