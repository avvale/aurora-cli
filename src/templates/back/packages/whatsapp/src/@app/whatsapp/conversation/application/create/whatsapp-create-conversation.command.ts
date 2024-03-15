import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappCreateConversationCommand
{
    constructor(
        public readonly payload: {
            id: string;
            accounts?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
