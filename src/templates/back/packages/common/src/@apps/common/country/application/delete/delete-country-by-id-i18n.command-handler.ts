import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCountryByIdI18NCommand } from './delete-country-by-id-i18n.command';
import { DeleteCountryByIdI18NService } from './delete-country-by-id-i18n.service';
import {
    CountryId
} from '../../domain/value-objects';

@CommandHandler(DeleteCountryByIdI18NCommand)
export class DeleteCountryByIdI18NCommandHandler implements ICommandHandler<DeleteCountryByIdI18NCommand>
{
    constructor(
        private readonly deleteCountryByIdI18NService: DeleteCountryByIdI18NService,
    ) {}

    async execute(command: DeleteCountryByIdI18NCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCountryByIdI18NService.main(
            new CountryId(command.id),
            command.constraint,
            command.cQMetadata
        );
    }
}