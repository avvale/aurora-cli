/* eslint-disable key-spacing */
import { QueueManagerUpdateQueueByIdCommand } from '@app/queue-manager/queue';
import { QueueManagerUpdateQueueByIdService } from '@app/queue-manager/queue/application/update/queue-manager-update-queue-by-id.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(QueueManagerUpdateQueueByIdCommand)
export class QueueManagerUpdateQueueByIdCommandHandler
    implements ICommandHandler<QueueManagerUpdateQueueByIdCommand>
{
    constructor(
        private readonly updateQueueByIdService: QueueManagerUpdateQueueByIdService,
    ) {}

    async execute(command: QueueManagerUpdateQueueByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateQueueByIdService.main(
            {
                id: new QueueManagerQueueId(command.payload.id),
                prefix: new QueueManagerQueuePrefix(command.payload.prefix, {
                    undefinable: true,
                }),
                name: new QueueManagerQueueName(command.payload.name, {
                    undefinable: true,
                }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
