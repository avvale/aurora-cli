import { MessageInbox, MessageInboxResponse } from '@app/message/inbox';
import {
  MessageInboxAccountCode,
  MessageInboxAccountId,
  MessageInboxAttachments,
  MessageInboxBody,
  MessageInboxCreatedAt,
  MessageInboxDeletedAt,
  MessageInboxIcon,
  MessageInboxId,
  MessageInboxImage,
  MessageInboxIsImportant,
  MessageInboxIsInternalLink,
  MessageInboxIsRead,
  MessageInboxIsReadAtLeastOnce,
  MessageInboxLink,
  MessageInboxMessageId,
  MessageInboxMessageRowId,
  MessageInboxMeta,
  MessageInboxRowId,
  MessageInboxSentAt,
  MessageInboxSubject,
  MessageInboxTenantIds,
  MessageInboxUpdatedAt,
} from '@app/message/inbox/domain/value-objects';
import { MessageMessageMapper } from '@app/message/message';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class MessageInboxMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param inbox
   */
  mapModelToAggregate(
    inbox: LiteralObject,
    cQMetadata?: CQMetadata,
  ): MessageInbox {
    if (!inbox) return;

    return this.makeAggregate(inbox, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param inboxes
   */
  mapModelsToAggregates(
    inboxes: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): MessageInbox[] {
    if (!Array.isArray(inboxes)) return;

    return inboxes.map((inbox) => this.makeAggregate(inbox, cQMetadata));
  }

  /**
   * Map aggregate to response
   * @param inbox
   */
  mapAggregateToResponse(inbox: MessageInbox): MessageInboxResponse {
    return this.makeResponse(inbox);
  }

  /**
   * Map array of aggregates to array responses
   * @param inboxes
   */
  mapAggregatesToResponses(inboxes: MessageInbox[]): MessageInboxResponse[] {
    if (!Array.isArray(inboxes)) return;

    return inboxes.map((inbox) => this.makeResponse(inbox));
  }

  private makeAggregate(
    inbox: LiteralObject,
    cQMetadata?: CQMetadata,
  ): MessageInbox {
    return MessageInbox.register(
      new MessageInboxId(inbox.id, { undefinable: true }),
      new MessageInboxRowId(inbox.rowId, { undefinable: true }),
      new MessageInboxTenantIds(inbox.tenantIds, { undefinable: true }),
      new MessageInboxMessageId(inbox.messageId, { undefinable: true }),
      new MessageInboxMessageRowId(inbox.messageRowId, {
        undefinable: true,
      }),
      new MessageInboxAccountId(inbox.accountId, { undefinable: true }),
      new MessageInboxAccountCode(inbox.accountCode, {
        undefinable: true,
      }),
      new MessageInboxIsImportant(inbox.isImportant, {
        undefinable: true,
      }),
      new MessageInboxSentAt(
        inbox.sentAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new MessageInboxSubject(inbox.subject, { undefinable: true }),
      new MessageInboxBody(inbox.body, { undefinable: true }),
      new MessageInboxLink(inbox.link, { undefinable: true }),
      new MessageInboxIsInternalLink(inbox.isInternalLink, {
        undefinable: true,
      }),
      new MessageInboxImage(inbox.image, { undefinable: true }),
      new MessageInboxIcon(inbox.icon, { undefinable: true }),
      new MessageInboxAttachments(inbox.attachments, {
        undefinable: true,
      }),
      new MessageInboxIsRead(inbox.isRead, { undefinable: true }),
      new MessageInboxIsReadAtLeastOnce(inbox.isReadAtLeastOnce, {
        undefinable: true,
      }),
      new MessageInboxMeta(inbox.meta, { undefinable: true }),
      new MessageInboxCreatedAt(
        inbox.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new MessageInboxUpdatedAt(
        inbox.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new MessageInboxDeletedAt(
        inbox.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      this.options.eagerLoading
        ? new MessageMessageMapper({
            eagerLoading: true,
          }).mapModelToAggregate(inbox.message, cQMetadata)
        : undefined,
    );
  }

  private makeResponse(inbox: MessageInbox): MessageInboxResponse {
    if (!inbox) return null;

    return new MessageInboxResponse(
      inbox.id.value,
      inbox.rowId.value,
      inbox.tenantIds.value,
      inbox.messageId.value,
      inbox.messageRowId.value,
      inbox.accountId.value,
      inbox.accountCode.value,
      inbox.isImportant.value,
      inbox.sentAt.value,
      inbox.subject.value,
      inbox.body.value,
      inbox.link.value,
      inbox.isInternalLink.value,
      inbox.image.value,
      inbox.icon.value,
      inbox.attachments.value,
      inbox.isRead.value,
      inbox.isReadAtLeastOnce.value,
      inbox.meta.value,
      inbox.createdAt.value,
      inbox.updatedAt.value,
      inbox.deletedAt.value,
      this.options.eagerLoading
        ? new MessageMessageMapper({
            eagerLoading: true,
          }).mapAggregateToResponse(inbox.message)
        : undefined,
    );
  }
}
