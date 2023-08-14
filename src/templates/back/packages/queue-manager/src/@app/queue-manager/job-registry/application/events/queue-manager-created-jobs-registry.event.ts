import { QueueManagerCreatedJobRegistryEvent } from './queue-manager-created-job-registry.event';

export class QueueManagerCreatedJobsRegistryEvent
{
    constructor(
        public readonly jobsRegistry: QueueManagerCreatedJobRegistryEvent[],
    ) {}
}
