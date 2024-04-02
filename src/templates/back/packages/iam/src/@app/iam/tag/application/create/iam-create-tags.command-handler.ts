/* eslint-disable key-spacing */
import { IamCreateTagsCommand } from '@app/iam/tag';
import { IamCreateTagsService } from '@app/iam/tag/application/create/iam-create-tags.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateTagsCommand)
export class IamCreateTagsCommandHandler implements ICommandHandler<IamCreateTagsCommand>
{
    constructor(
        private readonly createTagsService: IamCreateTagsService,
    ) {}

    async execute(command: IamCreateTagsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTagsService.main(
            command.payload
                .map(tag =>
                {
                    return {
                        id: new IamTagId(tag.id),
                        name: new IamTagName(tag.name),
                    };
                }),
            command.cQMetadata,
        );
    }
}
