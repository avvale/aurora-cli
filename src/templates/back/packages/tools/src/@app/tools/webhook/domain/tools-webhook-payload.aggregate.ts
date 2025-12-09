/* eslint-disable key-spacing */
import { ToolsDigestedWebhookEvent } from '@app/tools/webhook';
import {
    ToolsWebhookHeaders,
    ToolsWebhookPayload as ToolsWebhookPayloadValueObject,
} from '@app/tools/webhook/domain/value-objects';
import { LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsWebhookPayload extends AggregateRoot {
    headers: ToolsWebhookHeaders;
    payload: ToolsWebhookPayloadValueObject;

    constructor(
        headers: ToolsWebhookHeaders,
        payload: ToolsWebhookPayloadValueObject,
    ) {
        super();
        this.headers = headers;
        this.payload = payload;
    }

    static register(
        headers: ToolsWebhookHeaders,
        payload: ToolsWebhookPayloadValueObject,
    ): ToolsWebhookPayload {
        return new ToolsWebhookPayload(headers, payload);
    }

    digested(event: { payload: ToolsWebhookPayload }): void {
        this.apply(
            new ToolsDigestedWebhookEvent({
                payload: {
                    headers: event.payload.headers.value,
                    payload: event.payload.payload.value,
                },
            }),
        );
    }

    toDTO(): LiteralObject {
        return {
            headers: this.headers.value,
            payload: this.payload.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            headers: this.headers.value,
            payload: this.payload.value,
        };
    }
}
