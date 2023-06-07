import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCountryByIdI18nCommand } from './delete-country-by-id-i18n.command';
import { DeleteCountryByIdI18nService } from './delete-country-by-id-i18n.service';
import {
    CountryId
} from '../../domain/value-objects';

@CommandHandler(DeleteCountryByIdI18nCommand)
export class DeleteCountryByIdI18nCommandHandler implements ICommandHandler<DeleteCountryByIdI18nCommand>
{
    constructor(
        private readonly deleteCountryByIdI18nService: DeleteCountryByIdI18nService,
    ) {}

    async execute(command: DeleteCountryByIdI18nCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCountryByIdI18nService.main(
            new CountryId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}