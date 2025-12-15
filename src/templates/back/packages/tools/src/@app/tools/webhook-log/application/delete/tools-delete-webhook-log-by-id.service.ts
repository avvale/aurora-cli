import { ToolsIWebhookLogRepository } from '@app/tools/webhook-log';
import { ToolsWebhookLogId } from '@app/tools/webhook-log/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDeleteWebhookLogByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIWebhookLogRepository,
    ) {}

    async main(
        id: ToolsWebhookLogId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get object to delete
        const webhookLog = await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(webhookLog.id, {
            deleteOptions: cQMetadata?.repositoryOptions,
            cQMetadata,
        });

        // insert EventBus in object, to be able to apply and commit events
        const webhookLogRegister =
            this.publisher.mergeObjectContext(webhookLog);

        webhookLogRegister.deleted({
            payload: webhookLog,
            cQMetadata,
        }); // apply event to model events
        webhookLogRegister.commit(); // commit all events of model
    }
}
