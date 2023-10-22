import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuditingDeleteHttpCommunicationsCommand } from './auditing-delete-http-communications.command';
import { AuditingDeleteHttpCommunicationsService } from './auditing-delete-http-communications.service';

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
