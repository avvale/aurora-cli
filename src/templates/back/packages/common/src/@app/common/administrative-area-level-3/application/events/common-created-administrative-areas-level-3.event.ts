import { CommonCreatedAdministrativeAreaLevel3Event } from './common-created-administrative-area-level-3.event';

export class CommonCreatedAdministrativeAreasLevel3Event
{
    constructor(
        public readonly administrativeAreasLevel3: CommonCreatedAdministrativeAreaLevel3Event[],
    ) {}
}
