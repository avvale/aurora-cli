/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpsertResourceCommand } from './common-upsert-resource.command';
import { CommonUpsertResourceService } from './common-upsert-resource.service';
import {
    CommonResourceId,
    CommonResourceCode,
    CommonResourceName,
    CommonResourceIsActive,
    CommonResourceHasAttachments,
    CommonResourceCreatedAt,
    CommonResourceUpdatedAt,
    CommonResourceDeletedAt,
} from '../../domain/value-objects';

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
