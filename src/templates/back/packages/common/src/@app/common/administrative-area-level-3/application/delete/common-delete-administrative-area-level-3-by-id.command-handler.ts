import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteAdministrativeAreaLevel3ByIdCommand } from './common-delete-administrative-area-level-3-by-id.command';
import { CommonDeleteAdministrativeAreaLevel3ByIdService } from './common-delete-administrative-area-level-3-by-id.service';
import {
    CommonAdministrativeAreaLevel3Id
} from '../../domain/value-objects';

@CommandHandler(CommonDeleteAdministrativeAreaLevel3ByIdCommand)
export class CommonDeleteAdministrativeAreaLevel3ByIdCommandHandler implements ICommandHandler<CommonDeleteAdministrativeAreaLevel3ByIdCommand>
{
    constructor(
        private readonly deleteAdministrativeAreaLevel3ByIdService: CommonDeleteAdministrativeAreaLevel3ByIdService,
    ) {}

    async execute(command: CommonDeleteAdministrativeAreaLevel3ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreaLevel3ByIdService.main(
            new CommonAdministrativeAreaLevel3Id(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}