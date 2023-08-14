
export class QueueManagerQueueResponse
{
    constructor(
        public readonly id: string,
        public readonly prefix: string,
        public readonly name: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
