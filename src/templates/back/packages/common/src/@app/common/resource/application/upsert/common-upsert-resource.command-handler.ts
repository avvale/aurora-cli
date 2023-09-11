/* eslint-disable key-spacing */
import { CommonUpsertResourceCommand } from '@app/common/resource';
import { CommonUpsertResourceService } from '@app/common/resource/application/upsert/common-upsert-resource.service';
import {
    CommonResourceCode,
    CommonResourceHasAttachments,
    CommonResourceId,
    CommonResourceIsActive,
    CommonResourceName,
} from '@app/common/resource/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpsertResourceCommand)
export class CommonUpsertResourceCommandHandler implements ICommandHandler<CommonUpsertResourceCommand>
{
    constructor(
        private readonly upsertResourceService: CommonUpsertResourceService,
    ) {}

    async execute(command: CommonUpsertResourceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertResourceService.main(
            {
                id: new CommonResourceId(command.payload.id),
                code: new CommonResourceCode(command.payload.code),
                name: new CommonResourceName(command.payload.name),
                isActive: new CommonResourceIsActive(command.payload.isActive),
                hasAttachments: new CommonResourceHasAttachments(command.payload.hasAttachments),
            },
            command.cQMetadata,
        );
    }
}
