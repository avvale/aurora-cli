
export class ToolsProcedureResponse
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly type: string,
        public readonly version: string,
        public readonly isActive: boolean,
        public readonly isInstalled: boolean,
        public readonly isUpdated: boolean,
        public readonly upScript: string,
        public readonly downScript: string,
        public readonly sort: number,
        public readonly executedAt: string,
        public readonly checkedAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
