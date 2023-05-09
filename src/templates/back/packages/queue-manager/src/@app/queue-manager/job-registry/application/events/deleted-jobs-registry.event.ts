import { DeletedJobRegistryEvent } from './deleted-job-registry.event';

export class DeletedJobsRegistryEvent
{
    constructor(
        public readonly jobsRegistry: DeletedJobRegistryEvent[],
    ) {}
}