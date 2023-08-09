/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpdateResourceByIdCommand } from './common-update-resource-by-id.command';
import { CommonUpdateResourceByIdService } from './common-update-resource-by-id.service';
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

@CommandHandler(CommonUpdateResourceByIdCommand)
export class CommonUpdateResourceByIdCommandHandler implements ICommandHandler<CommonUpdateResourceByIdCommand>
{
    constructor(
        private readonly updateResourceByIdService: CommonUpdateResourceByIdService,
    ) {}

    async execute(command: CommonUpdateResourceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateResourceByIdService.main(
            {
                id: new CommonResourceId(command.payload.id),
                code: new CommonResourceCode(command.payload.code, { undefinable: true }),
                name: new CommonResourceName(command.payload.name, { undefinable: true }),
                isActive: new CommonResourceIsActive(command.payload.isActive, { undefinable: true }),
                hasAttachments: new CommonResourceHasAttachments(command.payload.hasAttachments, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
