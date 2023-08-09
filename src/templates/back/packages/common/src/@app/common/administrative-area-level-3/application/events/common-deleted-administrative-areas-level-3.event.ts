import { CommonDeletedAdministrativeAreaLevel3Event } from './common-deleted-administrative-area-level-3.event';

export class CommonDeletedAdministrativeAreasLevel3Event
{
    constructor(
        public readonly administrativeAreasLevel3: CommonDeletedAdministrativeAreaLevel3Event[],
    ) {}
}
