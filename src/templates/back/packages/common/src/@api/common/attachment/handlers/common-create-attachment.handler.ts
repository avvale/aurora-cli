import { CommonAttachmentDto, CommonCreateAttachmentDto } from '@api/common/attachment';
import { CommonAttachment, CommonCreateAttachmentInput } from '@api/graphql';
import { CommonCreateAttachmentCommand, CommonFindAttachmentByIdQuery } from '@app/common/attachment';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAttachmentHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCreateAttachmentInput | CommonCreateAttachmentDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachment | CommonAttachmentDto>
    {
        await this.commandBus.dispatch(new CommonCreateAttachmentCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindAttachmentByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
