/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpdateResourcesCommand } from './common-update-resources.command';
import { CommonUpdateResourcesService } from './common-update-resources.service';
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

@CommandHandler(CommonUpdateResourcesCommand)
export class CommonUpdateResourcesCommandHandler implements ICommandHandler<CommonUpdateResourcesCommand>
{
    constructor(
        private readonly updateResourcesService: CommonUpdateResourcesService,
    ) {}

    async execute(command: CommonUpdateResourcesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateResourcesService.main(
            {
                id: new CommonResourceId(command.payload.id, { undefinable: true }),
                code: new CommonResourceCode(command.payload.code, { undefinable: true }),
                name: new CommonResourceName(command.payload.name, { undefinable: true }),
                isActive: new CommonResourceIsActive(command.payload.isActive, { undefinable: true }),
                hasAttachments: new CommonResourceHasAttachments(command.payload.hasAttachments, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
