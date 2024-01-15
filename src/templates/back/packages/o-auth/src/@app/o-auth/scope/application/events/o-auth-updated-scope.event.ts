export class OAuthUpdatedScopeEvent
{
    constructor(
        public readonly id: string,
        public readonly code: string,
        public readonly name: string,
        public readonly roleIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
