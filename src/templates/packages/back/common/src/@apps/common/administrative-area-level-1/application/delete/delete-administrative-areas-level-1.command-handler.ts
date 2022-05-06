import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAdministrativeAreasLevel1Command } from './delete-administrative-areas-level-1.command';
import { DeleteAdministrativeAreasLevel1Service } from './delete-administrative-areas-level-1.service';

@CommandHandler(DeleteAdministrativeAreasLevel1Command)
export class DeleteAdministrativeAreasLevel1CommandHandler implements ICommandHandler<DeleteAdministrativeAreasLevel1Command>
{
    constructor(
        private readonly deleteAdministrativeAreasLevel1Service: DeleteAdministrativeAreasLevel1Service,
    ) {}

    async execute(command: DeleteAdministrativeAreasLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreasLevel1Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}