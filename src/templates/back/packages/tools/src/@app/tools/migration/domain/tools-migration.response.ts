
export class ToolsMigrationResponse
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly version: string,
        public readonly isActive: boolean,
        public readonly isExecuted: boolean,
        public readonly upScript: string,
        public readonly downScript: string,
        public readonly sort: number,
        public readonly executedAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
