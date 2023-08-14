import { CommonCreateAttachmentFamilyDto } from '@api/common/attachment-family';
import { CommonCreateAttachmentFamilyInput } from '@api/graphql';
import { CommonCreateAttachmentFamiliesCommand } from '@app/common/attachment-family';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAttachmentFamiliesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateAttachmentFamilyInput[] | CommonCreateAttachmentFamilyDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateAttachmentFamiliesCommand(
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
