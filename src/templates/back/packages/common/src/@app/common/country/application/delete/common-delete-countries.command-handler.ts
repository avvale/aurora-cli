import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteCountriesCommand } from './common-delete-countries.command';
import { CommonDeleteCountriesService } from './common-delete-countries.service';

@CommandHandler(CommonDeleteCountriesCommand)
export class CommonDeleteCountriesCommandHandler implements ICommandHandler<CommonDeleteCountriesCommand>
{
    constructor(
        private readonly deleteCountriesService: CommonDeleteCountriesService,
    ) {}

    async execute(command: CommonDeleteCountriesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCountriesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}