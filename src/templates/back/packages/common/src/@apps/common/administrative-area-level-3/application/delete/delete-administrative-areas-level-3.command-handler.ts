import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAdministrativeAreasLevel3Command } from './delete-administrative-areas-level-3.command';
import { DeleteAdministrativeAreasLevel3Service } from './delete-administrative-areas-level-3.service';

@CommandHandler(DeleteAdministrativeAreasLevel3Command)
export class DeleteAdministrativeAreasLevel3CommandHandler implements ICommandHandler<DeleteAdministrativeAreasLevel3Command>
{
    constructor(
        private readonly deleteAdministrativeAreasLevel3Service: DeleteAdministrativeAreasLevel3Service,
    ) {}

    async execute(command: DeleteAdministrativeAreasLevel3Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreasLevel3Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}