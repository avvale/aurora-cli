import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateUserByIdCommand {
    constructor(
        public readonly payload: {
            id: string;
            accountId?: string;
            name?: string;
            surname?: string;
            avatar?: string;
            mobile?: string;
            langId?: string;
            password?: string;
            isTwoFactorAuthenticationEnabled?: boolean;
            twoFactorAuthenticationSecret?: string;
            rememberToken?: string;
            meta?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
