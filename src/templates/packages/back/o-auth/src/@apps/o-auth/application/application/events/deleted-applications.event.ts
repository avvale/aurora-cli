import { DeletedApplicationEvent } from './deleted-application.event';

export class DeletedApplicationsEvent
{
    constructor(
        public readonly applications: DeletedApplicationEvent[],
    ) {}
}