import { QueueManagerUpdatedAndIncrementedJobRegistryEvent } from './queue-manager-updated-and-incremented-job-registry.event';

export class QueueManagerUpdatedAndIncrementedJobsRegistryEvent
{
    constructor(
        public readonly jobsRegistry: QueueManagerUpdatedAndIncrementedJobRegistryEvent[],
    ) {}
}
