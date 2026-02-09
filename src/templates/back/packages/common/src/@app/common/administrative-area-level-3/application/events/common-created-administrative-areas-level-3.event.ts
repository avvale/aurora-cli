/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CommonCreatedAdministrativeAreaLevel3Event } from '@app/common/administrative-area-level-3';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreatedAdministrativeAreasLevel3Event {
  constructor(
    public readonly event: {
      payload: CommonCreatedAdministrativeAreaLevel3Event[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
