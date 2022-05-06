import { DeletedAdministrativeAreaLevel1Event } from './deleted-administrative-area-level-1.event';

export class DeletedAdministrativeAreasLevel1Event
{
    constructor(
        public readonly administrativeAreasLevel1: DeletedAdministrativeAreaLevel1Event[],
    ) {}
}