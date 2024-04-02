/* eslint-disable key-spacing */
import { IamUpdateTagByIdCommand } from '@app/iam/tag';
import { IamUpdateTagByIdService } from '@app/iam/tag/application/update/iam-update-tag-by-id.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateTagByIdCommand)
export class IamUpdateTagByIdCommandHandler implements ICommandHandler<IamUpdateTagByIdCommand>
{
    constructor(
        private readonly updateTagByIdService: IamUpdateTagByIdService,
    ) {}

    async execute(command: IamUpdateTagByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTagByIdService.main(
            {
                id: new IamTagId(command.payload.id),
                name: new IamTagName(command.payload.name, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
