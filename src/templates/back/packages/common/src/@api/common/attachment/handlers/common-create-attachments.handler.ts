import { CommonCreateAttachmentDto } from '@api/common/attachment';
import { CommonCreateAttachmentInput } from '@api/graphql';
import { CommonCreateAttachmentsCommand } from '@app/common/attachment';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAttachmentsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateAttachmentInput[] | CommonCreateAttachmentDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateAttachmentsCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return true;
    }
}
