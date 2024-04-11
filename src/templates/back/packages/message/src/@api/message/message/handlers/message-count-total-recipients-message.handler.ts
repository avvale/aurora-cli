import { countTotalRecipients } from '@api/message/shared';
import { IamCountAccountQuery } from '@app/iam/account';
import { IQueryBus, Operator, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCountTotalRecipientsMessageHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        tenantRecipientIds: string[],
        scopeRecipients: string[],
        tagRecipients: string[],
        accountRecipientIds: string[],
        constraint?: QueryStatement,
    ): Promise<number>
    {
        return await countTotalRecipients({
            queryBus: this.queryBus,
            tenantRecipientIds,
            scopeRecipients,
            tagRecipients,
            accountRecipientIds,
        });
    }
}