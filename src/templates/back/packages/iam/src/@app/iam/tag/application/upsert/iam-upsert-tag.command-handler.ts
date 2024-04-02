/* eslint-disable key-spacing */
import { IamUpsertTagCommand } from '@app/iam/tag';
import { IamUpsertTagService } from '@app/iam/tag/application/upsert/iam-upsert-tag.service';
import {
    IamTagId,
    IamTagName,
} from '@app/iam/tag/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpsertTagCommand)
export class IamUpsertTagCommandHandler implements ICommandHandler<IamUpsertTagCommand>
{
    constructor(
        private readonly upsertTagService: IamUpsertTagService,
    ) {}

    async execute(command: IamUpsertTagCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertTagService.main(
            {
                id: new IamTagId(command.payload.id),
                name: new IamTagName(command.payload.name),
            },
            command.cQMetadata,
        );
    }
}
