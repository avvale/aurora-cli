import { MessageMessageStatus } from '@api/graphql';
import { MessageGetMessagesQuery, MessageUpdateMessagesCommand } from '@app/message/message';
import { MessageCreateOutboxesCommand } from '@app/message/outbox';
import { ICommandBus, IQueryBus, Operator, uuid } from '@aurorajs.dev/core';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as dayjs from 'dayjs';

@Injectable()
export class MessageCheckOutboxTask
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    // @Cron(CronExpression.EVERY_5_MINUTES) // Every 5 minutes
    @Cron(CronExpression.EVERY_MINUTE) // Every minute
    async handleCron(): Promise<void>
    {
        try
        {
            const messagesToSent = await this.queryBus.ask(new MessageGetMessagesQuery(
                {
                    where: {
                        status       : MessageMessageStatus.PENDING,
                        [Operator.or]: [
                            {
                                sendAt: {
                                    [Operator.is]: null,
                                },
                            },
                            {
                                sendAt: {
                                    [Operator.lte]: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                },
                            },
                        ],
                    },
                },
            ));

            if (messagesToSent.length > 0)
            {
                // create message in outbox
                await this.commandBus.dispatch(new MessageCreateOutboxesCommand(
                    messagesToSent.map(message => ({
                        id                 : uuid(),
                        messageId          : message.id,
                        accountRecipientIds: message.accountRecipientIds,
                        tenantRecipientIds : message.tenantRecipientIds,
                        scopeRecipients    : message.scopeRecipients,
                        sort               : null,
                    })),
                ));

                await this.commandBus.dispatch(new MessageUpdateMessagesCommand(
                    {
                        status: MessageMessageStatus.SENT,
                    },
                    {
                        where: {
                            id: messagesToSent.map(message => message.id),
                        },
                    },
                ));
            }

            Logger.log('Check outbox messages', 'MessageCheckOutboxTask');
        }
        catch (error)
        {
            Logger.error('Error to check messages outbox: ' + error, 'MessageCheckOutboxTask');
        }
    }
}