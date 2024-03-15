import { WhatsappConversation, whatsappMockConversationData } from '@app/whatsapp/conversation';
import {
    WhatsappConversationAccounts,
    WhatsappConversationCreatedAt,
    WhatsappConversationDeletedAt,
    WhatsappConversationId,
    WhatsappConversationUpdatedAt,
} from '@app/whatsapp/conversation/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class WhatsappMockConversationSeeder extends MockSeeder<WhatsappConversation>
{
    public collectionSource: WhatsappConversation[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const conversation of _.orderBy(whatsappMockConversationData, ['id']))
        {
            this.collectionSource.push(
                WhatsappConversation.register(
                    new WhatsappConversationId(conversation.id),
                    new WhatsappConversationAccounts(conversation.accounts),
                    new WhatsappConversationCreatedAt({ currentTimestamp: true }),
                    new WhatsappConversationUpdatedAt({ currentTimestamp: true }),
                    new WhatsappConversationDeletedAt(null),
                ),
            );
        }
    }
}
