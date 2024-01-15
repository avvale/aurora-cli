import { AuditingDeleteHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { AuditingDeleteHttpCommunicationsService } from '@app/auditing/http-communication/application/delete/auditing-delete-http-communications.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AuditingDeleteHttpCommunicationsCommand)
export class AuditingDeleteHttpCommunicationsCommandHandler implements ICommandHandler<AuditingDeleteHttpCommunicationsCommand>
{
    constructor(
        private readonly deleteHttpCommunicationsService: AuditingDeleteHttpCommunicationsService,
    ) {}

    async execute(command: AuditingDeleteHttpCommunicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteHttpCommunicationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
