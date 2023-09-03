import { CommonDeleteCountriesCommand } from '@app/common/country';
import { CommonDeleteCountriesService } from '@app/common/country/application/delete/common-delete-countries.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
