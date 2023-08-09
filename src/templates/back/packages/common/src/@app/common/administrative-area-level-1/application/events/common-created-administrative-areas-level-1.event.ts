import { CommonCreatedAdministrativeAreaLevel1Event } from './common-created-administrative-area-level-1.event';

export class CommonCreatedAdministrativeAreasLevel1Event
{
    constructor(
        public readonly administrativeAreasLevel1: CommonCreatedAdministrativeAreaLevel1Event[],
    ) {}
}
