import {
    SupportCreateCommentCommand,
    SupportUpdateCommentsCommand,
} from '@app/support/comment';
import {
    SupportFindIssueQuery,
    SupportUpdateIssuesCommand,
} from '@app/support/issue';
import { ToolsDigestedWebhookEvent } from '@app/tools/webhook';
import { ICommandBus, IQueryBus, uuid } from '@aurorajs.dev/core';
import { Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { head } from 'lodash';
import { supportCheckWebhookPayload } from '../functions/support-check-webhook-payload.function';

@EventsHandler(ToolsDigestedWebhookEvent)
export class SupportDigestedWebhookEventHandler
    implements IEventHandler<ToolsDigestedWebhookEvent>
{
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async handle(payload: ToolsDigestedWebhookEvent): Promise<void> {
        switch (payload.event.payload.payload.event) {
            case 'taskStatusUpdated': {
                Logger.log(
                    `Webhook taskStatusUpdated handled: ${JSON.stringify(payload)}`,
                    'SupportDigestWebhooksHandler',
                );

                await supportCheckWebhookPayload(this.moduleRef, payload);

                const firstHistory = head(
                    payload.event.payload.payload.history_items,
                );

                void this.commandBus.dispatch(
                    new SupportUpdateIssuesCommand(
                        {
                            externalStatus: firstHistory.after.status,
                            externalColorStatus: firstHistory.after.color,
                        },
                        {
                            where: {
                                externalId:
                                    payload.event.payload.payload.task_id,
                            },
                        },
                    ),
                );

                break;
            }

            case 'taskCommentPosted': {
                Logger.log(
                    `Webhook taskCommentPosted handled: ${JSON.stringify(payload)}`,
                    'SupportDigestWebhooksHandler',
                );

                await supportCheckWebhookPayload(this.moduleRef, payload);

                const firstHistory = head(
                    payload.event.payload.payload.history_items,
                );

                const task = await this.queryBus.ask(
                    new SupportFindIssueQuery({
                        where: {
                            externalId: payload.event.payload.payload.task_id,
                        },
                    }),
                );

                await this.commandBus.dispatch(
                    new SupportCreateCommentCommand({
                        id: uuid(),
                        externalId: firstHistory.comment.id,
                        description: firstHistory.comment.text_content,
                        issueId: task.id,
                    }),
                );
                break;
            }

            case 'taskCommentUpdated': {
                Logger.log(
                    `Webhook taskCommentUpdated handled: ${JSON.stringify(payload)}`,
                    'SupportDigestWebhooksHandler',
                );

                await supportCheckWebhookPayload(this.moduleRef, payload);

                const firstHistory = head(
                    payload.event.payload.payload.history_items,
                );

                await this.commandBus.dispatch(
                    new SupportUpdateCommentsCommand(
                        {
                            description: firstHistory.comment.text_content,
                        },
                        {
                            where: {
                                externalId: firstHistory.comment.id,
                            },
                        },
                    ),
                );
                break;
            }

            default:
                Logger.log(
                    `Webhook event not handled: ${JSON.stringify(payload)}`,
                    'SupportDigestWebhooksHandler',
                );
                break;
        }
    }
}
