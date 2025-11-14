import { AuditingDeleteHttpCommunicationByIdCommand } from '@app/auditing/http-communication';
import { AuditingDeleteHttpCommunicationByIdService } from '@app/auditing/http-communication/application/delete/auditing-delete-http-communication-by-id.service';
import { AuditingHttpCommunicationId } from '@app/auditing/http-communication/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AuditingDeleteHttpCommunicationByIdCommand)
export class AuditingDeleteHttpCommunicationByIdCommandHandler
    implements ICommandHandler<AuditingDeleteHttpCommunicationByIdCommand>
{
    constructor(
        private readonly deleteHttpCommunicationByIdService: AuditingDeleteHttpCommunicationByIdService,
    ) {}

    async execute(
        command: AuditingDeleteHttpCommunicationByIdCommand,
    ): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteHttpCommunicationByIdService.main(
            new AuditingHttpCommunicationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
