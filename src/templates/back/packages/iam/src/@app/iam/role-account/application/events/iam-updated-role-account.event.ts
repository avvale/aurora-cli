import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedRoleAccountEvent
{
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
