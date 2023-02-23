import { UpdatedAdministrativeAreaLevel3Event } from './updated-administrative-area-level-3.event';

export class UpdatedAdministrativeAreasLevel3Event
{
    constructor(
        public readonly administrativeAreasLevel3: UpdatedAdministrativeAreaLevel3Event[],
    ) {}
}