/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonCreatedAdministrativeAreaLevel2Event } from '@app/common/administrative-area-level-2';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreatedAdministrativeAreasLevel2Event {
  constructor(
    public readonly event: {
      payload: CommonCreatedAdministrativeAreaLevel2Event[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
