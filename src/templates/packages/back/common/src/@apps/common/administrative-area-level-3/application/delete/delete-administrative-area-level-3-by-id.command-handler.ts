import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAdministrativeAreaLevel3ByIdCommand } from './delete-administrative-area-level-3-by-id.command';
import { DeleteAdministrativeAreaLevel3ByIdService } from './delete-administrative-area-level-3-by-id.service';
import {
    AdministrativeAreaLevel3Id
} from '../../domain/value-objects';

@CommandHandler(DeleteAdministrativeAreaLevel3ByIdCommand)
export class DeleteAdministrativeAreaLevel3ByIdCommandHandler implements ICommandHandler<DeleteAdministrativeAreaLevel3ByIdCommand>
{
    constructor(
        private readonly deleteAdministrativeAreaLevel3ByIdService: DeleteAdministrativeAreaLevel3ByIdService,
    ) {}

    async execute(command: DeleteAdministrativeAreaLevel3ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreaLevel3ByIdService.main(
            new AdministrativeAreaLevel3Id(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}