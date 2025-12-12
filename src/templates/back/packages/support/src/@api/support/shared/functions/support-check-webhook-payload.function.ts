import {
    ToolsDigestedWebhookEvent,
    ToolsFindWebhookQuery,
} from '@app/tools/webhook';
import { Crypt, IQueryBus } from '@aurorajs.dev/core';
import { BadRequestException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export const supportCheckWebhookPayload = async (
    moduleRef: ModuleRef,
    payload: ToolsDigestedWebhookEvent,
): Promise<boolean> => {
    const queryBus = moduleRef.get(IQueryBus, { strict: false });

    // set headers to lowercase
    const lowercasedHeaders = Object.fromEntries(
        Object.entries(payload.event.payload.headers).map(([key, value]) => [
            key.toLowerCase(),
            value,
        ]),
    );

    // get webhook by external id
    const webhook = await queryBus.ask(
        new ToolsFindWebhookQuery({
            where: {
                externalId: payload.event.payload.payload.webhook_id,
            },
        }),
    );

    if (!webhook) {
        throw new BadRequestException(
            `Webhook with external id ${payload.event.payload.payload.webhook_id} not found`,
        );
    }

    const signature = Crypt.signature(
        webhook.secret,
        JSON.stringify(payload.event.payload.payload),
    );

    if (signature !== lowercasedHeaders['x-signature']) {
        throw new BadRequestException(
            `Invalid signature for webhook with external id ${payload.event.payload.payload.webhook_id}`,
        );
    }

    return true;
};
