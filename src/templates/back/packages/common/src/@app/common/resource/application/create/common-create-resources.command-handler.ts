/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateResourcesCommand } from './common-create-resources.command';
import { CommonCreateResourcesService } from './common-create-resources.service';
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

@CommandHandler(CommonCreateResourcesCommand)
export class CommonCreateResourcesCommandHandler implements ICommandHandler<CommonCreateResourcesCommand>
{
    constructor(
        private readonly createResourcesService: CommonCreateResourcesService,
    ) {}

    async execute(command: CommonCreateResourcesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createResourcesService.main(
            command.payload
                .map(resource =>
                {
                    return {
                        id: new CommonResourceId(resource.id),
                        code: new CommonResourceCode(resource.code),
                        name: new CommonResourceName(resource.name),
                        isActive: new CommonResourceIsActive(resource.isActive),
                        hasAttachments: new CommonResourceHasAttachments(resource.hasAttachments),
                    };
                }),
            command.cQMetadata,
        );
    }
}
