import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedUserEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                accountId: string;
                name: string;
                surname: string;
                avatar: string;
                mobile: string;
                langId: string;
                password: string;
                isTwoFactorAuthenticationEnabled: boolean;
                twoFactorAuthenticationSecret: string;
                rememberToken: string;
                meta: any;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
