export class QueueManagerUpdatedAndIncrementedJobRegistryEvent
{
    constructor(
        public readonly id: string,
        public readonly queueName: string,
        public readonly state: string,
        public readonly jobId: string,
        public readonly jobName: string,
        public readonly tags: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
