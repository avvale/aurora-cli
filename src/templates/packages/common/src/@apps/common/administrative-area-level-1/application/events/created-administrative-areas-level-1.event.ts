import { CreatedAdministrativeAreaLevel1Event } from './created-administrative-area-level-1.event';

export class CreatedAdministrativeAreasLevel1Event
{
    constructor(
        public readonly administrativeAreasLevel1: CreatedAdministrativeAreaLevel1Event[],
    ) {}
}