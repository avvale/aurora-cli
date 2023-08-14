import { QueueManagerDeletedJobRegistryEvent } from './queue-manager-deleted-job-registry.event';

export class QueueManagerDeletedJobsRegistryEvent
{
    constructor(
        public readonly jobsRegistry: QueueManagerDeletedJobRegistryEvent[],
    ) {}
}
