import { CreatedApplicationEvent } from './created-application.event';

export class CreatedApplicationsEvent
{
    constructor(
        public readonly applications: CreatedApplicationEvent[],
    ) {}
}