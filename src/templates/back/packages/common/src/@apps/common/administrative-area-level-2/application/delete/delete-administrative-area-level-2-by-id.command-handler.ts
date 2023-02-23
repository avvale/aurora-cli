import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAdministrativeAreaLevel2ByIdCommand } from './delete-administrative-area-level-2-by-id.command';
import { DeleteAdministrativeAreaLevel2ByIdService } from './delete-administrative-area-level-2-by-id.service';
import {
    AdministrativeAreaLevel2Id
} from '../../domain/value-objects';

@CommandHandler(DeleteAdministrativeAreaLevel2ByIdCommand)
export class DeleteAdministrativeAreaLevel2ByIdCommandHandler implements ICommandHandler<DeleteAdministrativeAreaLevel2ByIdCommand>
{
    constructor(
        private readonly deleteAdministrativeAreaLevel2ByIdService: DeleteAdministrativeAreaLevel2ByIdService,
    ) {}

    async execute(command: DeleteAdministrativeAreaLevel2ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreaLevel2ByIdService.main(
            new AdministrativeAreaLevel2Id(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}