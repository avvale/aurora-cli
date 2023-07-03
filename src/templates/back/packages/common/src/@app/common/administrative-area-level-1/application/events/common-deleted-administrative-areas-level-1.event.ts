import { CommonDeletedAdministrativeAreaLevel1Event } from './common-deleted-administrative-area-level-1.event';

export class CommonDeletedAdministrativeAreasLevel1Event
{
    constructor(
        public readonly administrativeAreasLevel1: CommonDeletedAdministrativeAreaLevel1Event[],
    ) {}
}