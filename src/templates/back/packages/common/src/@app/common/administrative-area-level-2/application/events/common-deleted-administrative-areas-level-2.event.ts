import { CommonDeletedAdministrativeAreaLevel2Event } from './common-deleted-administrative-area-level-2.event';

export class CommonDeletedAdministrativeAreasLevel2Event {
  constructor(
    public readonly administrativeAreasLevel2: CommonDeletedAdministrativeAreaLevel2Event[],
  ) {}
}
