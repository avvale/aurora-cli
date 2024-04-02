/* eslint-disable key-spacing */
import { IamCreateTagCommand } from '@app/iam/tag';
import { IamCreateTagService } from '@app/iam/tag/application/create/iam-create-tag.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateTagCommand)
export class IamCreateTagCommandHandler implements ICommandHandler<IamCreateTagCommand>
{
    constructor(
        private readonly createTagService: IamCreateTagService,
    ) {}

    async execute(command: IamCreateTagCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTagService.main(
            {
                id: new IamTagId(command.payload.id),
                name: new IamTagName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}
