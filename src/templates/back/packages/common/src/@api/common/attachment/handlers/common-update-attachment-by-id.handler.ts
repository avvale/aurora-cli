import { CommonAttachmentDto, CommonUpdateAttachmentByIdDto } from '@api/common/attachment';
import { CommonAttachment, CommonUpdateAttachmentByIdInput } from '@api/graphql';
import { CommonFindAttachmentByIdQuery, CommonUpdateAttachmentByIdCommand } from '@app/common/attachment';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAttachmentByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAttachmentByIdInput | CommonUpdateAttachmentByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachment | CommonAttachmentDto>
    {
        const attachment = await this.queryBus.ask(new CommonFindAttachmentByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, attachment);

        await this.commandBus.dispatch(new CommonUpdateAttachmentByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindAttachmentByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
