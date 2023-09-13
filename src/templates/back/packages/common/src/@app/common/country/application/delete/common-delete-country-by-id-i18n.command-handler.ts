import { CommonDeleteCountryByIdI18nCommand } from '@app/common/country';
import { CommonDeleteCountryByIdI18nService } from '@app/common/country/application/delete/common-delete-country-by-id-i18n.service';
import { CommonCountryId } from '@app/common/country/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonDeleteCountryByIdI18nCommand)
export class CommonDeleteCountryByIdI18nCommandHandler implements ICommandHandler<CommonDeleteCountryByIdI18nCommand>
{
    constructor(
        private readonly deleteCountryByIdI18nService: CommonDeleteCountryByIdI18nService,
    ) {}

    async execute(command: CommonDeleteCountryByIdI18nCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCountryByIdI18nService
            .main(
                new CommonCountryId(command.id),
                command.constraint,
                command.cQMetadata,
            );
    }
}
