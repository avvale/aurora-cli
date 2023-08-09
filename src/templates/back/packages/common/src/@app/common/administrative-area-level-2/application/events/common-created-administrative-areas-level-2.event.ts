import { CommonCreatedAdministrativeAreaLevel2Event } from './common-created-administrative-area-level-2.event';

export class CommonCreatedAdministrativeAreasLevel2Event
{
    constructor(
        public readonly administrativeAreasLevel2: CommonCreatedAdministrativeAreaLevel2Event[],
    ) {}
}
