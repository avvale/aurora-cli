import { UpdatedApplicationEvent } from './updated-application.event';

export class UpdatedApplicationsEvent
{
    constructor(
        public readonly applications: UpdatedApplicationEvent[],
    ) {}
}