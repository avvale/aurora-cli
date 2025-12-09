import { IamAccountResponse } from '@app/iam/account';
import {
    MessageCreateInboxesCommand,
    MessageMaxInboxQuery,
} from '@app/message/inbox';
import {
    MessageCreateInboxSettingCommand,
    MessageFindInboxSettingQuery,
    MessageUpdateInboxSettingByIdCommand,
} from '@app/message/inbox-setting';
import { MessageGetOutboxesQuery } from '@app/message/outbox';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    Operator,
    uuid,
} from '@aurorajs.dev/core';
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class MessageCheckMessagesInboxHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        if (!account)
            throw new UnauthorizedException(
                'You are not authorized to access messages',
            );

        let inboxSetting;

        try {
            inboxSetting = await this.queryBus.ask(
                new MessageFindInboxSettingQuery(
                    {
                        where: {
                            accountId: account.id,
                        },
                    },
                    {},
                    {
                        timezone,
                    },
                ),
            );
        } catch (error) {
            // manage not found inbox setting later
            if (!(error instanceof NotFoundException)) throw error;
        }

        if (inboxSetting) {
            // get new messages
            const outboxMessagesResponse = await this.queryBus.ask(
                new MessageGetOutboxesQuery({
                    where: {
                        // get messages that are not already in the inbox yet
                        rowId: {
                            [Operator.gt]: inboxSetting.lastReadMessageRowId,
                        },
                        [Operator.or]: [
                            {
                                [Operator.and]: [
                                    {
                                        [Operator.or]: [
                                            {
                                                // query messages for tenants that account belongs to
                                                tenantRecipientIds: {
                                                    [Operator.overlap]:
                                                        account.dTenants,
                                                },
                                            },
                                            {
                                                tenantRecipientIds: [],
                                            },
                                        ],
                                    },
                                    {
                                        [Operator.or]: [
                                            {
                                                // query messages for scopes that account belongs to
                                                scopeRecipients: {
                                                    [Operator.overlap]:
                                                        account.scopes,
                                                },
                                            },
                                            {
                                                scopeRecipients: [],
                                            },
                                        ],
                                    },
                                    {
                                        [Operator.or]: [
                                            {
                                                // query messages for tags that account belongs to
                                                tagRecipients: {
                                                    [Operator.overlap]:
                                                        account.tags,
                                                },
                                            },
                                            {
                                                tagRecipients: [],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                // query messages for account
                                accountRecipientIds: {
                                    [Operator.contains]: [account.id],
                                },
                            },
                        ],
                    },
                    include: [
                        {
                            association: 'message',
                        },
                    ],
                    order: [['rowId', 'ASC']],
                }),
            );

            // If there are no group recipients (tenant, scope, or tag), but there are account recipients and the account is not in the
            // account recipients, the message is discarded.
            // For cases with group recipients (tenant, scope, or tag), they have already been filtered in the query.
            const outboxMessages = outboxMessagesResponse.filter(
                (outboxMessage) =>
                    !(
                        (outboxMessage.tenantRecipientIds === null ||
                            outboxMessage.tenantRecipientIds.length === 0) &&
                        (outboxMessage.scopeRecipients === null ||
                            outboxMessage.scopeRecipients.length === 0) &&
                        (outboxMessage.tagRecipients === null ||
                            outboxMessage.tagRecipients.length === 0) &&
                        outboxMessage.accountRecipientIds.length > 0 &&
                        !outboxMessage.accountRecipientIds.includes(account.id)
                    ),
            );

            // create new messages in inbox
            if (outboxMessages.length > 0) {
                // create messages in inbox
                await this.commandBus.dispatch(
                    new MessageCreateInboxesCommand(
                        outboxMessages.map((outboxMessage) => ({
                            id: uuid(),
                            tenantIds: account.dTenants,
                            messageId: outboxMessage.messageId,
                            messageRowId: outboxMessage.rowId,
                            accountId: account.id,
                            accountCode: account.username,
                            isImportant: outboxMessage.message.isImportant,
                            sentAt: outboxMessage.createdAt,
                            subject: outboxMessage.message.subject,
                            body: outboxMessage.message.body,
                            link: outboxMessage.message.link,
                            isInternalLink:
                                outboxMessage.message.isInternalLink,
                            image: outboxMessage.message.image,
                            icon: outboxMessage.message.icon,
                            attachments: outboxMessage.message.attachments,
                            isRead: false,
                            isReadAtLeastOnce: false,
                        })),
                        {
                            // data comes from the database
                            // is already in UTC, and should not be converted
                            // in this case we do not pass the timezone
                            repositoryOptions: {
                                auditing,
                            },
                        },
                    ),
                );

                // get max messageRowId
                const maxMessageRowId = await this.queryBus.ask(
                    new MessageMaxInboxQuery('messageRowId'),
                );

                // update inbox setting
                await this.commandBus.dispatch(
                    new MessageUpdateInboxSettingByIdCommand(
                        {
                            id: inboxSetting.id,
                            lastReadMessageRowId: maxMessageRowId,
                        },
                        {},
                        {
                            timezone,
                            repositoryOptions: {
                                auditing,
                            },
                        },
                    ),
                );
            }

            return true;
        }

        // **********************************************************
        // * if no existing inbox setting, create new inbox setting *
        // **********************************************************

        // get max messageRowId
        const maxMessageRowId = await this.queryBus.ask(
            new MessageMaxInboxQuery('messageRowId'),
        );

        // create inbox setting
        await this.commandBus.dispatch(
            new MessageCreateInboxSettingCommand(
                {
                    id: uuid(),
                    accountId: account.id,
                    lastReadMessageRowId: maxMessageRowId || 0,
                },
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return true;
    }
}
