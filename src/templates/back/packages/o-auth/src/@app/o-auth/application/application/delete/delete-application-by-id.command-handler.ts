import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteApplicationByIdCommand } from './delete-application-by-id.command';
import { DeleteApplicationByIdService } from './delete-application-by-id.service';
import {
    ApplicationId
} from '../../domain/value-objects';

@CommandHandler(DeleteApplicationByIdCommand)
export class DeleteApplicationByIdCommandHandler implements ICommandHandler<DeleteApplicationByIdCommand>
{
    constructor(
        private readonly deleteApplicationByIdService: DeleteApplicationByIdService,
    ) {}

    async execute(command: DeleteApplicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationByIdService.main(
            new ApplicationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}