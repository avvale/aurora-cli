/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonCreatedAdministrativeAreaLevel1Event } from '@app/common/administrative-area-level-1';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreatedAdministrativeAreasLevel1Event {
  constructor(
    public readonly event: {
      payload: CommonCreatedAdministrativeAreaLevel1Event[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
