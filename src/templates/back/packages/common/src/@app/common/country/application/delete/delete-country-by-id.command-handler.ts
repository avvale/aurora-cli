import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCountryByIdCommand } from './delete-country-by-id.command';
import { DeleteCountryByIdService } from './delete-country-by-id.service';
import {
    CountryId
} from '../../domain/value-objects';

@CommandHandler(DeleteCountryByIdCommand)
export class DeleteCountryByIdCommandHandler implements ICommandHandler<DeleteCountryByIdCommand>
{
    constructor(
        private readonly deleteCountryByIdService: DeleteCountryByIdService,
    ) {}

    async execute(command: DeleteCountryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCountryByIdService.main(
            new CountryId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}