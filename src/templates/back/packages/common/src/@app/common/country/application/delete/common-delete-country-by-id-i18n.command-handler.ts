import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteCountryByIdI18nCommand } from './common-delete-country-by-id-i18n.command';
import { CommonDeleteCountryByIdI18nService } from './common-delete-country-by-id-i18n.service';
import {
    CommonCountryId
} from '../../domain/value-objects';

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