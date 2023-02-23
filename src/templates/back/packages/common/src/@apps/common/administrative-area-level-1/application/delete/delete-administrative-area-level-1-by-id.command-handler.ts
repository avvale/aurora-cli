import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAdministrativeAreaLevel1ByIdCommand } from './delete-administrative-area-level-1-by-id.command';
import { DeleteAdministrativeAreaLevel1ByIdService } from './delete-administrative-area-level-1-by-id.service';
import {
    AdministrativeAreaLevel1Id
} from '../../domain/value-objects';

@CommandHandler(DeleteAdministrativeAreaLevel1ByIdCommand)
export class DeleteAdministrativeAreaLevel1ByIdCommandHandler implements ICommandHandler<DeleteAdministrativeAreaLevel1ByIdCommand>
{
    constructor(
        private readonly deleteAdministrativeAreaLevel1ByIdService: DeleteAdministrativeAreaLevel1ByIdService,
    ) {}

    async execute(command: DeleteAdministrativeAreaLevel1ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreaLevel1ByIdService.main(
            new AdministrativeAreaLevel1Id(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}