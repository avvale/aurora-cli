import { DeletedAdministrativeAreaLevel3Event } from './deleted-administrative-area-level-3.event';

export class DeletedAdministrativeAreasLevel3Event
{
    constructor(
        public readonly administrativeAreasLevel3: DeletedAdministrativeAreaLevel3Event[],
    ) {}
}