import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonDeleteAdministrativeAreaLevel1ByIdCommand } from './common-delete-administrative-area-level-1-by-id.command';
import { CommonDeleteAdministrativeAreaLevel1ByIdService } from './common-delete-administrative-area-level-1-by-id.service';
import {
    CommonAdministrativeAreaLevel1Id
} from '../../domain/value-objects';

@CommandHandler(CommonDeleteAdministrativeAreaLevel1ByIdCommand)
export class CommonDeleteAdministrativeAreaLevel1ByIdCommandHandler implements ICommandHandler<CommonDeleteAdministrativeAreaLevel1ByIdCommand>
{
    constructor(
        private readonly deleteAdministrativeAreaLevel1ByIdService: CommonDeleteAdministrativeAreaLevel1ByIdService,
    ) {}

    async execute(command: CommonDeleteAdministrativeAreaLevel1ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAdministrativeAreaLevel1ByIdService.main(
            new CommonAdministrativeAreaLevel1Id(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}