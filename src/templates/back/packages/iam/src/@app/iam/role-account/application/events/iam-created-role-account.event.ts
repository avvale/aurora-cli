import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedRoleAccountEvent {
    constructor(
        public readonly event: {
            payload: {
                roleId: string;
                accountId: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
