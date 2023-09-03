import { CommonDeleteCountryByIdCommand } from '@app/common/country';
import { CommonDeleteCountryByIdService } from '@app/common/country/application/delete/common-delete-country-by-id.service';
import { CommonCountryId } from '@app/common/country/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteCountryByIdCommand)
export class CommonDeleteCountryByIdCommandHandler implements ICommandHandler<CommonDeleteCountryByIdCommand>
{
    constructor(
        private readonly deleteCountryByIdService: CommonDeleteCountryByIdService,
    ) {}

    async execute(command: CommonDeleteCountryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCountryByIdService.main(
            new CommonCountryId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
