import { ToolsWebhookPayload } from '@app/tools/webhook';
import {
  ToolsWebhookHeaders,
  ToolsWebhookPayload as ToolsWebhookPayloadValueObject,
} from '@app/tools/webhook/domain/value-objects';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDigestWebhookService {
  constructor(private readonly publisher: EventPublisher) {}

  async main(
    headers: ToolsWebhookHeaders,
    payload: ToolsWebhookPayloadValueObject,
  ): Promise<void> {
    // create aggregate with factory pattern
    const webhook = ToolsWebhookPayload.register(headers, payload);

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const webhookRegister = this.publisher.mergeObjectContext(webhook);

    webhookRegister.digested({
      payload: webhook,
    }); // apply event to model events
    webhookRegister.commit(); // commit all events of model
  }
}
