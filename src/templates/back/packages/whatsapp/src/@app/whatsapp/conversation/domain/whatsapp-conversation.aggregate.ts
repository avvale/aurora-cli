/* eslint-disable key-spacing */
import {
  WhatsappCreatedConversationEvent,
  WhatsappDeletedConversationEvent,
  WhatsappUpdatedConversationEvent,
} from '@app/whatsapp/conversation';
import {
  WhatsappConversationCategory,
  WhatsappConversationCreatedAt,
  WhatsappConversationDeletedAt,
  WhatsappConversationExpiration,
  WhatsappConversationId,
  WhatsappConversationIsBillable,
  WhatsappConversationPricingModel,
  WhatsappConversationTimelineId,
  WhatsappConversationUpdatedAt,
  WhatsappConversationWabaContactId,
  WhatsappConversationWabaConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { WhatsappTimeline } from '@app/whatsapp/timeline';
import { LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class WhatsappConversation extends AggregateRoot {
  id: WhatsappConversationId;
  wabaConversationId: WhatsappConversationWabaConversationId;
  timelineId: WhatsappConversationTimelineId;
  wabaContactId: WhatsappConversationWabaContactId;
  expiration: WhatsappConversationExpiration;
  category: WhatsappConversationCategory;
  isBillable: WhatsappConversationIsBillable;
  pricingModel: WhatsappConversationPricingModel;
  createdAt: WhatsappConversationCreatedAt;
  updatedAt: WhatsappConversationUpdatedAt;
  deletedAt: WhatsappConversationDeletedAt;
  timeline: WhatsappTimeline;

  constructor(
    id: WhatsappConversationId,
    wabaConversationId: WhatsappConversationWabaConversationId,
    timelineId: WhatsappConversationTimelineId,
    wabaContactId: WhatsappConversationWabaContactId,
    expiration: WhatsappConversationExpiration,
    category: WhatsappConversationCategory,
    isBillable: WhatsappConversationIsBillable,
    pricingModel: WhatsappConversationPricingModel,
    createdAt: WhatsappConversationCreatedAt,
    updatedAt: WhatsappConversationUpdatedAt,
    deletedAt: WhatsappConversationDeletedAt,
    timeline?: WhatsappTimeline,
  ) {
    super();
    this.id = id;
    this.wabaConversationId = wabaConversationId;
    this.timelineId = timelineId;
    this.wabaContactId = wabaContactId;
    this.expiration = expiration;
    this.category = category;
    this.isBillable = isBillable;
    this.pricingModel = pricingModel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.timeline = timeline;
  }

  static register(
    id: WhatsappConversationId,
    wabaConversationId: WhatsappConversationWabaConversationId,
    timelineId: WhatsappConversationTimelineId,
    wabaContactId: WhatsappConversationWabaContactId,
    expiration: WhatsappConversationExpiration,
    category: WhatsappConversationCategory,
    isBillable: WhatsappConversationIsBillable,
    pricingModel: WhatsappConversationPricingModel,
    createdAt: WhatsappConversationCreatedAt,
    updatedAt: WhatsappConversationUpdatedAt,
    deletedAt: WhatsappConversationDeletedAt,
    timeline?: WhatsappTimeline,
  ): WhatsappConversation {
    return new WhatsappConversation(
      id,
      wabaConversationId,
      timelineId,
      wabaContactId,
      expiration,
      category,
      isBillable,
      pricingModel,
      createdAt,
      updatedAt,
      deletedAt,
      timeline,
    );
  }

  created(conversation: WhatsappConversation): void {
    this.apply(
      new WhatsappCreatedConversationEvent(
        conversation.id.value,
        conversation.wabaConversationId.value,
        conversation.timelineId.value,
        conversation.wabaContactId.value,
        conversation.expiration.value,
        conversation.category.value,
        conversation.isBillable.value,
        conversation.pricingModel.value,
        conversation.createdAt?.value,
        conversation.updatedAt?.value,
        conversation.deletedAt?.value,
      ),
    );
  }

  updated(conversation: WhatsappConversation): void {
    this.apply(
      new WhatsappUpdatedConversationEvent(
        conversation.id?.value,
        conversation.wabaConversationId?.value,
        conversation.timelineId?.value,
        conversation.wabaContactId?.value,
        conversation.expiration?.value,
        conversation.category?.value,
        conversation.isBillable?.value,
        conversation.pricingModel?.value,
        conversation.createdAt?.value,
        conversation.updatedAt?.value,
        conversation.deletedAt?.value,
      ),
    );
  }

  deleted(conversation: WhatsappConversation): void {
    this.apply(
      new WhatsappDeletedConversationEvent(
        conversation.id.value,
        conversation.wabaConversationId.value,
        conversation.timelineId.value,
        conversation.wabaContactId.value,
        conversation.expiration.value,
        conversation.category.value,
        conversation.isBillable.value,
        conversation.pricingModel.value,
        conversation.createdAt?.value,
        conversation.updatedAt?.value,
        conversation.deletedAt?.value,
      ),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      wabaConversationId: this.wabaConversationId.value,
      timelineId: this.timelineId.value,
      wabaContactId: this.wabaContactId.value,
      expiration: this.expiration.value,
      category: this.category.value,
      isBillable: this.isBillable.value,
      pricingModel: this.pricingModel.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      timeline: this.timeline?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      wabaConversationId: this.wabaConversationId.value,
      timelineId: this.timelineId.value,
      wabaContactId: this.wabaContactId.value,
      expiration: this.expiration.value,
      category: this.category.value,
      isBillable: this.isBillable.value,
      pricingModel: this.pricingModel.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      timeline: this.timeline?.toDTO(),
    };
  }
}
