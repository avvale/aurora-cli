import { CommonAttachmentDto } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import { CommonDeleteAttachmentByIdCommand, CommonFindAttachmentByIdQuery } from '@app/common/attachment';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAttachmentByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachment | CommonAttachmentDto>
    {
        const attachment = await this.queryBus.ask(new CommonFindAttachmentByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteAttachmentByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return attachment;
    }
}
