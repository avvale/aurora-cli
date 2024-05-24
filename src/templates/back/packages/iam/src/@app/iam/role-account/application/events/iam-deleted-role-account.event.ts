import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedRoleAccountEvent
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
