import { CQMetadata } from '@aurorajs.dev/core';

export class WhatsappCreateConversationsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            accounts?: string[];
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
