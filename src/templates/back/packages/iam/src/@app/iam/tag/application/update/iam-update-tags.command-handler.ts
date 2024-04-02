/* eslint-disable key-spacing */
import { IamUpdateTagsCommand } from '@app/iam/tag';
import { IamUpdateTagsService } from '@app/iam/tag/application/update/iam-update-tags.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateTagsCommand)
export class IamUpdateTagsCommandHandler implements ICommandHandler<IamUpdateTagsCommand>
{
    constructor(
        private readonly updateTagsService: IamUpdateTagsService,
    ) {}

    async execute(command: IamUpdateTagsCommand): Promise<void>
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
