export class DeletedBoundedContextEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly root: string,
        public readonly sort: number,
        public readonly isActive: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}