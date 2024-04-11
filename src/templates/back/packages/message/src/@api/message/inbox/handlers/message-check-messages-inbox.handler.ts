import { IamAccountResponse } from '@app/iam/account';
import { MessageCreateInboxesCommand, MessageMaxInboxQuery } from '@app/message/inbox';
import { MessageCreateInboxSettingCommand, MessageFindInboxSettingQuery, MessageUpdateInboxSettingByIdCommand } from '@app/message/inbox-setting';
import { MessageGetOutboxesQuery } from '@app/message/outbox';
import { AuditingMeta, ICommandBus, IQueryBus, Operator, uuid } from '@aurorajs.dev/core';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class MessageCheckMessagesInboxHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        if (!account) throw new UnauthorizedException('You are not authorized to access messages');

        let inboxSetting;

        try
        {
            inboxSetting = await this.queryBus.ask(new MessageFindInboxSettingQuery(
                {
                    where: {
                        accountId: account.id,
                    },
                },
                {},
                {
                    timezone,
                },
            ));
        }
        catch (error)
        {
            // manage not found inbox setting later
            if (!(error instanceof NotFoundException)) throw error;
        }

        if (inboxSetting)
        {
            // get new messages
            const outboxMessages = await this.queryBus.ask(new MessageGetOutboxesQuery(
                {
                    where: {
                        // avoid query messages that are already in the inbox
                        sort: {
                            [Operator.gt]: inboxSetting.sort,
                        },
                        [Operator.or]: [
                            {
                                // query messages for account
                                accountRecipientIds: {
                                    [Operator.contains]: [account.id],
                                },
                            },
                            {
                                [Operator.and]: [
                                    {
                                        [Operator.or]: [
                                            {
                                                // query messages for all tenants, tenantRecipientIds = null
                                                tenantRecipientIds: {
                                                    [Operator.is]: null,
                                                },
                                            },
                                            {
                                                // query messages for tenants that account belongs to
                                                tenantRecipientIds: {
                                                    [Operator.overlap]: account.dTenants,
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        [Operator.or]: [
                                            {
                                                // query messages for all scopes, scopeRecipients = null
                                                scopeRecipients: {
                                                    [Operator.is]: null,
                                                },
                                            },
                                            {
                                                // query messages for scopes that account belongs to
                                                scopeRecipients: {
                                                    [Operator.overlap]: account.scopes,
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    include: [
                        {
                            association: 'message',
                        },

                    ],
                    order: [['sort', 'ASC']],
                },
            ));

            // create new messages in inbox
            if (outboxMessages.length > 0)
            {
                // create messages in inbox
                await this.commandBus.dispatch(new MessageCreateInboxesCommand(
                    outboxMessages.map(outboxMessage => ({
                        id               : uuid(),
                        tenantIds        : account.dTenants,
                        messageId        : outboxMessage.messageId,
                        sort             : outboxMessage.sort,
                        accountId        : account.id,
                        accountCode      : account.user.username,
                        isImportant      : outboxMessage.message.isImportant,
                        sentAt           : outboxMessage.createdAt,
                        subject          : outboxMessage.message.subject,
                        body             : outboxMessage.message.body,
                        link             : outboxMessage.message.link,
                        isInternalLink   : outboxMessage.message.isInternalLink,
                        image            : outboxMessage.message.image,
                        icon             : outboxMessage.message.icon,
                        attachments      : outboxMessage.message.attachments,
                        isRead           : false,
                        isReadAtLeastOnce: false,
                    })),
                    {
                        timezone,
                        repositoryOptions: {
                            auditing,
                        },
                    },
                ));

                // get max sort
                const maxSort = await this.queryBus.ask(new MessageMaxInboxQuery('sort'));

                // update inbox setting
                await this.commandBus.dispatch(new MessageUpdateInboxSettingByIdCommand(
                    {
                        id  : inboxSetting.id,
                        sort: maxSort,
                    },
                    {},
                    {
                        timezone,
                        repositoryOptions: {
                            auditing,
                        },
                    },
                ));
            }

            return true;
        }

        // **********************************************************
        // * if no existing inbox setting, create new inbox setting *
        // **********************************************************

        // get max sort
        const maxSort = await this.queryBus.ask(new MessageMaxInboxQuery('sort'));

        // create inbox setting
        await this.commandBus.dispatch(new MessageCreateInboxSettingCommand(
            {
                id       : uuid(),
                accountId: account.id,
                sort     : maxSort || 0,
            },
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return true;
    }
}