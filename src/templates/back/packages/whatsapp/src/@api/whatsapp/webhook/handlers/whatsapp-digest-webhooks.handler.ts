/* eslint-disable max-len */
import {
  WhatsappMessage,
  WhatsappMessageDirection,
  WhatsappMessageStatus,
  WhatsappUpdateMessageByIdInput,
} from '@api/graphql';
import {
  WhatsappConnectorService,
  WhatsappTimelineService,
} from '@api/whatsapp/shared';
import { WhatsappPayload, WhatsappStatus } from '@app/whatsapp';
import {
  WhatsappCreateConversationCommand,
  WhatsappGetConversationsQuery,
} from '@app/whatsapp/conversation';
import {
  WhatsappCreateMessageCommand,
  WhatsappGetMessagesQuery,
  WhatsappUpdateMessageByIdCommand,
} from '@app/whatsapp/message';
import { ICommandBus, IQueryBus, uuid } from '@aurorajs.dev/core';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import {
  mapMessageStatus,
  mapMessageType,
  verifyWebhookSignature,
} from '../shared';

@Injectable()
export class WhatsappDigestWebhooksHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    private readonly whatsappConnectorService: WhatsappConnectorService,
    private readonly whatsappTimelineService: WhatsappTimelineService,
  ) {}

  async main(
    xHubSignature256: string,
    payload: WhatsappPayload,
  ): Promise<void> {
    if (!verifyWebhookSignature(xHubSignature256, payload)) {
      Logger.error(
        `Invalid signature: xHubSignature256: ${xHubSignature256} payload: ${JSON.stringify(payload)}`,
        'WhatsappDigestWebhooksHandler',
      );
      throw new UnauthorizedException('Invalid signature');
    }
    Logger.log(
      `New payload: ${JSON.stringify(payload)}`,
      'WhatsappDigestWebhooksHandler',
    );

    // get fist object change from payload
    const wabaChange = payload.entry[0].changes[0];
    const wabaStatuses = wabaChange.value.statuses;
    const wabaMessages = wabaChange.value.messages;
    const currentPersistentConversations = [];

    // *********************************
    // * manage conversations creation *
    // *********************************
    if (
      Array.isArray(wabaStatuses) &&
      // only sent status, has expiration_timestamp and conversations, fields necessary to create conversation
      wabaStatuses.some(
        (wabaStatus) =>
          wabaStatus.status === 'sent' &&
          wabaStatus.conversation &&
          wabaStatus.conversation.expiration_timestamp,
      )
    ) {
      // get messages with new status
      const messagesWithNewStatus = await this.queryBus.ask(
        new WhatsappGetMessagesQuery({
          attributes: [
            'id',
            'wabaMessageId',
            'timelineId',
            'statuses',
            'wabaContactId',
          ],
          where: {
            wabaMessageId: wabaStatuses.map((status) => status.id),
          },
        }),
      );

      const wabaSentStatuses = wabaStatuses.filter(
        (status) => status.conversation && status.status === 'sent',
      );

      // get all conversations
      const persistentConversations = await this.queryBus.ask(
        new WhatsappGetConversationsQuery({
          attributes: ['id', 'wabaConversationId'],
          where: {
            wabaConversationId: wabaSentStatuses.map(
              (status) => status.conversation.id,
            ),
          },
        }),
      );

      // we get the statuses that have new conversations that are not in database
      const persistentConversationIds = persistentConversations.map(
        (currentConversation) => currentConversation.wabaConversationId,
      );
      const wabaSentStatusesWithoutPersistentConversation =
        wabaSentStatuses.filter(
          (status) =>
            !persistentConversationIds.includes(status.conversation.id),
        );

      const commandCreateConversationPromises = [];
      for (const wabaStatus of wabaSentStatusesWithoutPersistentConversation) {
        // we obtain referenced message in the status
        const message = messagesWithNewStatus.find(
          (message) => message.wabaMessageId === wabaStatus.id,
        );

        // avoid create conversation if message not found
        if (!message) {
          Logger.error(
            `Message not found: The message referenced to the status was not found, when trying to create a conversation. payload: ${JSON.stringify(payload)}`,
            'WhatsappDigestWebhooksHandler',
          );
          continue;
        }

        const newConversationId = uuid();
        commandCreateConversationPromises.push(
          this.commandBus.dispatch(
            new WhatsappCreateConversationCommand({
              id: newConversationId,
              wabaConversationId: wabaStatus.conversation.id,
              timelineId: message.timelineId,
              wabaContactId: message.wabaContactId,
              expiration: wabaStatus.conversation.expiration_timestamp,
              category: wabaStatus.pricing.category,
              isBillable: wabaStatus.pricing.billable,
              pricingModel: wabaStatus.pricing.pricing_model,
            }),
          ),
        );

        persistentConversations.push({
          id: newConversationId,
          wabaConversationId: wabaStatus.conversation.id,
        });
      }

      // add persistentConversations to set conversationId in messages
      currentPersistentConversations.push(...persistentConversations);

      // create new conversations
      if (commandCreateConversationPromises.length > 0)
        await Promise.all(commandCreateConversationPromises);
    }

    // ********************************
    // * manage update status message *
    // ********************************
    if (Array.isArray(wabaStatuses)) {
      // get messages with from statuses
      const messages = await this.queryBus.ask(
        new WhatsappGetMessagesQuery({
          attributes: [
            'id',
            'wabaMessageId',
            'timelineId',
            'statuses',
            'wabaContactId',
          ],
          where: {
            wabaMessageId: wabaStatuses.map((status) => status.id),
          },
        }),
      );

      // we iterate all messages to find the message to be updated
      const commandUpdateMessagesPromises = [];
      for (const message of messages) {
        // get statuses mapped for current message
        const statusEnumValues = wabaStatuses
          .filter((wabaStatus) => wabaStatus.id === message.wabaMessageId) // get statuses for current message
          .map((status) => mapMessageStatus(status.status)); // get status value and map to enum

        const messageUpdated = {
          id: message.id,
          // use Set to avoid duplicates and merge with current statuses
          statuses: [...new Set([...message.statuses, ...statusEnumValues])],
        };

        /* #region manage conversation to get conversation id */
        this.setConversationIdInMessage(
          wabaStatuses,
          message,
          currentPersistentConversations,
          messageUpdated,
        );
        /* #endregion manage conversation to get conversation id */

        // update statuses for current message
        commandUpdateMessagesPromises.push(
          this.commandBus.dispatch(
            new WhatsappUpdateMessageByIdCommand(messageUpdated),
          ),
        );
      }

      if (commandUpdateMessagesPromises.length > 0)
        await Promise.all(commandUpdateMessagesPromises);
    }

    // ***************************
    // * manage message creation *
    // ***************************
    if (Array.isArray(wabaMessages)) {
      // manage status messages and conversations creations
      if (!Array.isArray(wabaChange.value.contacts)) {
        Logger.error(
          `Invalid message structure: Need contacts array. payload: ${JSON.stringify(payload)}`,
          'WhatsappDigestWebhooksHandler',
        );
        throw new BadRequestException(
          'Invalid message structure: Need contacts array',
        );
      }

      // get all messages from context
      const contextMessages = wabaMessages.some(
        (wabaMessage) => wabaMessage.context?.id,
      )
        ? await this.queryBus.ask(
            new WhatsappGetMessagesQuery({
              attributes: [
                'id',
                'wabaMessageId',
                'timelineId',
                'conversationId',
                'wabaContactId',
                'contactName',
                'payload',
              ],
              where: {
                wabaMessageId: wabaMessages
                  .filter((wabaMessage) => wabaMessage.context?.id)
                  .map((wabaMessage) => wabaMessage.context.id),
              },
            }),
          )
        : [];

      // get first contact from payload.
      // Attention! array of contacts can be empty
      const contact =
        wabaChange.value.contacts.length > 0
          ? wabaChange.value.contacts.shift()
          : null;

      // get timeline for current contact and sender telephone id
      const timeline = contact
        ? await this.whatsappTimelineService.getTimeline(
            this.whatsappConnectorService.getSenderTelephoneNumberId(),
            contact.wa_id,
          )
        : null;

      const commandCreateMessagePromises = [];
      for (const wabaMessage of wabaMessages) {
        // get context message
        const contextMessage = wabaMessage.context?.id
          ? contextMessages.find(
              (contextMessage) =>
                contextMessage.wabaMessageId === wabaMessage.context.id,
            )
          : null;

        if (!contact && !contextMessage)
          Logger.error(
            `Invalid message structure: Need contact or context message. payload: ${JSON.stringify(payload)}`,
            'WhatsappDigestWebhooksHandler',
          );

        commandCreateMessagePromises.push(
          this.commandBus.dispatch(
            new WhatsappCreateMessageCommand({
              id: uuid(),
              wabaMessageId: wabaMessage.id,
              timelineId: timeline ? timeline.id : contextMessage?.timelineId,
              // when init message, conversationId is not assigned, unless it has context
              conversationId: contextMessage?.conversationId ?? null,
              statuses: [WhatsappMessageStatus.ACCEPTED],
              direction: WhatsappMessageDirection.INPUT,
              // null because is a input message
              accountId: null,
              wabaContactId: contact
                ? contact.wa_id
                : contextMessage?.wabaContactId,
              contactName: contact
                ? contact.profile.name
                : contextMessage?.contactName,
              type: mapMessageType(wabaMessage.type),
              payload,
            }),
          ),
        );
      }

      await Promise.all(commandCreateMessagePromises);
    }
  }

  private setConversationIdInMessage(
    wabaStatuses: WhatsappStatus[],
    message: WhatsappMessage,
    currentPersistentConversations: {
      id: string;
      wabaConversationId: string;
    }[],
    messageUpdated: WhatsappUpdateMessageByIdInput,
  ): void {
    const wabaStatusWithConversation = wabaStatuses.find(
      (wabaStatus) =>
        wabaStatus.id === message.wabaMessageId && wabaStatus.conversation,
    );
    if (wabaStatusWithConversation) {
      // we get the conversation that is persisted and belongs to the message that we are updating its state
      const conversation = currentPersistentConversations.find(
        (currentPersistentConversation) =>
          currentPersistentConversation.wabaConversationId ===
          wabaStatusWithConversation.conversation.id,
      );
      if (conversation) messageUpdated['conversationId'] = conversation.id;
    }
  }
}
