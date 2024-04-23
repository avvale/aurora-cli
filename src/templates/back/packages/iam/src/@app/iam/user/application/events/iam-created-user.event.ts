export class IamCreatedUserEvent
{
    constructor(
        public readonly id: string,
        public readonly accountId: string,
        public readonly name: string,
        public readonly surname: string,
        public readonly avatar: string,
        public readonly mobile: string,
        public readonly langId: string,
        public readonly password: string,
        public readonly isTwoFactorAuthenticationEnabled: boolean,
        public readonly twoFactorAuthenticationSecret: string,
        public readonly rememberToken: string,
        public readonly meta: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
