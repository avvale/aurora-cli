import { Pagination } from '@api/graphql';
import { IamAccountResponse } from '@app/iam/account';
import { MessagePaginateInboxesQuery } from '@app/message/inbox';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class MessagePaginateCustomerMessagesInboxHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        account: IamAccountResponse,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        if (!account)
            throw new UnauthorizedException(
                'You are not authorized to access messages',
            );

        // get messages according to the query
        return await this.queryBus.ask(
            new MessagePaginateInboxesQuery(
                queryStatement,
                {
                    ...constraint,
                    where: {
                        ...constraint?.where,
                        accountId: account.id,
                    },
                    attributes: [
                        'id',
                        'tenantIds',
                        'messageId',
                        'messageRowId',
                        'accountId',
                        'accountCode',
                        'isImportant',
                        'sentAt',
                        'subject',
                        'body',
                        'link',
                        'isInternalLink',
                        'image',
                        'icon',
                        'attachments',
                        'isRead',
                        'isReadAtLeastOnce',
                        'createdAt',
                        'updatedAt',
                        'deletedAt',
                    ],
                },
                {
                    timezone,
                },
            ),
        );
    }
}
