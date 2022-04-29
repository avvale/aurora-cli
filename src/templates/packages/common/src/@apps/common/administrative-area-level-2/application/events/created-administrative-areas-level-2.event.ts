import { CreatedAdministrativeAreaLevel2Event } from './created-administrative-area-level-2.event';

export class CreatedAdministrativeAreasLevel2Event
{
    constructor(
        public readonly administrativeAreasLevel2: CreatedAdministrativeAreaLevel2Event[],
    ) {}
}