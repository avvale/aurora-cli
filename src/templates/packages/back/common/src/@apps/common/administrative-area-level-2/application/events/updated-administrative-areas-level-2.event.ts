import { UpdatedAdministrativeAreaLevel2Event } from './updated-administrative-area-level-2.event';

export class UpdatedAdministrativeAreasLevel2Event
{
    constructor(
        public readonly administrativeAreasLevel2: UpdatedAdministrativeAreaLevel2Event[],
    ) {}
}