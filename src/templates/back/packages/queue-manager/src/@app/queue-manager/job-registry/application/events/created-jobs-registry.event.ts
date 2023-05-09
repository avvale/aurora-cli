import { CreatedJobRegistryEvent } from './created-job-registry.event';

export class CreatedJobsRegistryEvent
{
    constructor(
        public readonly jobsRegistry: CreatedJobRegistryEvent[],
    ) {}
}