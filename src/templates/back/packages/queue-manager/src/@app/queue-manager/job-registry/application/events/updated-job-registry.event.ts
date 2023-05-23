export class UpdatedJobRegistryEvent
{
    constructor(
        public readonly id: string,
        public readonly queueName: string,
        public readonly state: string,
        public readonly jobId: string,
        public readonly jobName: string,
        public readonly tags: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}