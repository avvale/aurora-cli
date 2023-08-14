/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateResourceCommand } from './common-create-resource.command';
import { CommonCreateResourceService } from './common-create-resource.service';
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

@CommandHandler(CommonCreateResourceCommand)
export class CommonCreateResourceCommandHandler implements ICommandHandler<CommonCreateResourceCommand>
{
    constructor(
        private readonly createResourceService: CommonCreateResourceService,
    ) {}

    async execute(command: CommonCreateResourceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createResourceService.main(
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
