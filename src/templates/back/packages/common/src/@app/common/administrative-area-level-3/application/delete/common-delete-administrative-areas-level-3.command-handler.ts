import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteAdministrativeAreasLevel3Command } from './common-delete-administrative-areas-level-3.command';
import { CommonDeleteAdministrativeAreasLevel3Service } from './common-delete-administrative-areas-level-3.service';

@CommandHandler(CommonDeleteAdministrativeAreasLevel3Command)
export class CommonDeleteAdministrativeAreasLevel3CommandHandler implements ICommandHandler<CommonDeleteAdministrativeAreasLevel3Command>
{
    constructor(
        private readonly deleteAdministrativeAreasLevel3Service: CommonDeleteAdministrativeAreasLevel3Service,
    ) {}

    async execute(command: CommonDeleteAdministrativeAreasLevel3Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreasLevel3Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}