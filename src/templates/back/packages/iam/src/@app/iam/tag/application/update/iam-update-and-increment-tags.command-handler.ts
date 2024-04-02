/* eslint-disable key-spacing */
import { IamUpdateAndIncrementTagsCommand } from '@app/iam/tag';
import { IamUpdateAndIncrementTagsService } from '@app/iam/tag/application/update/iam-update-and-increment-tags.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAndIncrementTagsCommand)
export class IamUpdateAndIncrementTagsCommandHandler implements ICommandHandler<IamUpdateAndIncrementTagsCommand>
{
    constructor(
        private readonly updateTagsService: IamUpdateAndIncrementTagsService,
    ) {}

    async execute(command: IamUpdateAndIncrementTagsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTagsService.main(
            {
                id: new IamTagId(command.payload.id, { undefinable: true }),
                name: new IamTagName(command.payload.name, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
