import { UpdatedJobRegistryEvent } from './updated-job-registry.event';

export class UpdatedJobsRegistryEvent
{
    constructor(
        public readonly jobsRegistry: UpdatedJobRegistryEvent[],
    ) {}
}