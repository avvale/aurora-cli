import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteLangsCommand } from './delete-langs.command';
import { DeleteLangsService } from './delete-langs.service';

@CommandHandler(DeleteLangsCommand)
export class DeleteLangsCommandHandler implements ICommandHandler<DeleteLangsCommand>
{
    constructor(
        private readonly deleteLangsService: DeleteLangsService,
    ) {}

    async execute(command: DeleteLangsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteLangsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}