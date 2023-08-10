import { QueueManagerUpdatedJobRegistryEvent } from './queue-manager-updated-job-registry.event';

export class QueueManagerUpdatedJobsRegistryEvent
{
    constructor(
        public readonly jobsRegistry: QueueManagerUpdatedJobRegistryEvent[],
    ) {}
}
