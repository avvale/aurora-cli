import { CommonUpdatedAdministrativeAreaLevel1Event } from './common-updated-administrative-area-level-1.event';

export class CommonUpdatedAdministrativeAreasLevel1Event {
  constructor(
    public readonly administrativeAreasLevel1: CommonUpdatedAdministrativeAreaLevel1Event[],
  ) {}
}
