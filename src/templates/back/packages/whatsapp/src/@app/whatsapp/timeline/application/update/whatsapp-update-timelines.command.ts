import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class WhatsappUpdateTimelinesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            accounts?: string[];
            wabaPhoneNumberId?: string;
            wabaContactId?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}