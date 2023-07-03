import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteAdministrativeAreasLevel1Command } from './common-delete-administrative-areas-level-1.command';
import { CommonDeleteAdministrativeAreasLevel1Service } from './common-delete-administrative-areas-level-1.service';

@CommandHandler(CommonDeleteAdministrativeAreasLevel1Command)
export class CommonDeleteAdministrativeAreasLevel1CommandHandler implements ICommandHandler<CommonDeleteAdministrativeAreasLevel1Command>
{
    constructor(
        private readonly deleteAdministrativeAreasLevel1Service: CommonDeleteAdministrativeAreasLevel1Service,
    ) {}

    async execute(command: CommonDeleteAdministrativeAreasLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreasLevel1Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}