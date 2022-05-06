import { CreatedAdministrativeAreaLevel3Event } from './created-administrative-area-level-3.event';

export class CreatedAdministrativeAreasLevel3Event
{
    constructor(
        public readonly administrativeAreasLevel3: CreatedAdministrativeAreaLevel3Event[],
    ) {}
}