import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCountriesCommand } from './delete-countries.command';
import { DeleteCountriesService } from './delete-countries.service';

@CommandHandler(DeleteCountriesCommand)
export class DeleteCountriesCommandHandler implements ICommandHandler<DeleteCountriesCommand>
{
    constructor(
        private readonly deleteCountriesService: DeleteCountriesService,
    ) {}

    async execute(command: DeleteCountriesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCountriesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}