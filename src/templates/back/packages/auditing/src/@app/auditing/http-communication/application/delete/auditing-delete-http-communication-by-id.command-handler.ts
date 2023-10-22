import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingDeleteHttpCommunicationByIdCommand } from './auditing-delete-http-communication-by-id.command';
import { AuditingDeleteHttpCommunicationByIdService } from './auditing-delete-http-communication-by-id.service';
import {
    AuditingHttpCommunicationId
} from '../../domain/value-objects';

@CommandHandler(AuditingDeleteHttpCommunicationByIdCommand)
export class AuditingDeleteHttpCommunicationByIdCommandHandler implements ICommandHandler<AuditingDeleteHttpCommunicationByIdCommand>
{
    constructor(
        private readonly deleteHttpCommunicationByIdService: AuditingDeleteHttpCommunicationByIdService,
    ) {}

    async execute(command: AuditingDeleteHttpCommunicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteHttpCommunicationByIdService.main(
            new AuditingHttpCommunicationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
