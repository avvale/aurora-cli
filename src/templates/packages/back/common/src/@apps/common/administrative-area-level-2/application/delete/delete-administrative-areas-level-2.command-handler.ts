import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAdministrativeAreasLevel2Command } from './delete-administrative-areas-level-2.command';
import { DeleteAdministrativeAreasLevel2Service } from './delete-administrative-areas-level-2.service';

@CommandHandler(DeleteAdministrativeAreasLevel2Command)
export class DeleteAdministrativeAreasLevel2CommandHandler implements ICommandHandler<DeleteAdministrativeAreasLevel2Command>
{
    constructor(
        private readonly deleteAdministrativeAreasLevel2Service: DeleteAdministrativeAreasLevel2Service,
    ) {}

    async execute(command: DeleteAdministrativeAreasLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreasLevel2Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}