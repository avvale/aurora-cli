import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteAdministrativeAreaLevel2ByIdCommand } from './common-delete-administrative-area-level-2-by-id.command';
import { CommonDeleteAdministrativeAreaLevel2ByIdService } from './common-delete-administrative-area-level-2-by-id.service';
import {
    CommonAdministrativeAreaLevel2Id
} from '../../domain/value-objects';

@CommandHandler(CommonDeleteAdministrativeAreaLevel2ByIdCommand)
export class CommonDeleteAdministrativeAreaLevel2ByIdCommandHandler implements ICommandHandler<CommonDeleteAdministrativeAreaLevel2ByIdCommand>
{
    constructor(
        private readonly deleteAdministrativeAreaLevel2ByIdService: CommonDeleteAdministrativeAreaLevel2ByIdService,
    ) {}

    async execute(command: CommonDeleteAdministrativeAreaLevel2ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreaLevel2ByIdService.main(
            new CommonAdministrativeAreaLevel2Id(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}