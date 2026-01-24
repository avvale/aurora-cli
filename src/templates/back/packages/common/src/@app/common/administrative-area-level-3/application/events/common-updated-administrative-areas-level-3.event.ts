import { CommonUpdatedAdministrativeAreaLevel3Event } from './common-updated-administrative-area-level-3.event';

export class CommonUpdatedAdministrativeAreasLevel3Event {
  constructor(
    public readonly administrativeAreasLevel3: CommonUpdatedAdministrativeAreaLevel3Event[],
  ) {}
}
