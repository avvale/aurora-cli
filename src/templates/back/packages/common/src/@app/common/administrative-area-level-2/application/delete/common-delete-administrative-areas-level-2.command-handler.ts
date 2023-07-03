import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteAdministrativeAreasLevel2Command } from './common-delete-administrative-areas-level-2.command';
import { CommonDeleteAdministrativeAreasLevel2Service } from './common-delete-administrative-areas-level-2.service';

@CommandHandler(CommonDeleteAdministrativeAreasLevel2Command)
export class CommonDeleteAdministrativeAreasLevel2CommandHandler implements ICommandHandler<CommonDeleteAdministrativeAreasLevel2Command>
{
    constructor(
        private readonly deleteAdministrativeAreasLevel2Service: CommonDeleteAdministrativeAreasLevel2Service,
    ) {}

    async execute(command: CommonDeleteAdministrativeAreasLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreasLevel2Service.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}