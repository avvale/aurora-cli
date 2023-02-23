import { UpdatedAdministrativeAreaLevel1Event } from './updated-administrative-area-level-1.event';

export class UpdatedAdministrativeAreasLevel1Event
{
    constructor(
        public readonly administrativeAreasLevel1: UpdatedAdministrativeAreaLevel1Event[],
    ) {}
}