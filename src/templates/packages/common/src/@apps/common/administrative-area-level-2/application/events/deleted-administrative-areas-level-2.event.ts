import { DeletedAdministrativeAreaLevel2Event } from './deleted-administrative-area-level-2.event';

export class DeletedAdministrativeAreasLevel2Event
{
    constructor(
        public readonly administrativeAreasLevel2: DeletedAdministrativeAreaLevel2Event[],
    ) {}
}