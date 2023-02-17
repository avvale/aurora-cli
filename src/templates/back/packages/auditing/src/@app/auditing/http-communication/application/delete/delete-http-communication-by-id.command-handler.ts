import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteHttpCommunicationByIdCommand } from './delete-http-communication-by-id.command';
import { DeleteHttpCommunicationByIdService } from './delete-http-communication-by-id.service';
import {
    HttpCommunicationId
} from '../../domain/value-objects';

@CommandHandler(DeleteHttpCommunicationByIdCommand)
export class DeleteHttpCommunicationByIdCommandHandler implements ICommandHandler<DeleteHttpCommunicationByIdCommand>
{
    constructor(
        private readonly deleteHttpCommunicationByIdService: DeleteHttpCommunicationByIdService,
    ) {}

    async execute(command: DeleteHttpCommunicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteHttpCommunicationByIdService.main(
            new HttpCommunicationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}