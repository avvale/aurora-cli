import { CommonDeleteAdministrativeAreaLevel2ByIdCommand } from '@app/common/administrative-area-level-2';
import { CommonDeleteAdministrativeAreaLevel2ByIdService } from '@app/common/administrative-area-level-2/application/delete/common-delete-administrative-area-level-2-by-id.service';
import { CommonAdministrativeAreaLevel2Id } from '@app/common/administrative-area-level-2/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
