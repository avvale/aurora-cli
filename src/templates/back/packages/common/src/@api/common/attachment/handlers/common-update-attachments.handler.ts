import { CommonAttachmentDto, CommonUpdateAttachmentsDto } from '@api/common/attachment';
import { CommonAttachment, CommonUpdateAttachmentsInput } from '@api/graphql';
import { CommonGetAttachmentsQuery, CommonUpdateAttachmentsCommand } from '@app/common/attachment';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAttachmentsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAttachmentsInput | CommonUpdateAttachmentsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachment | CommonAttachmentDto>
    {
        await this.commandBus.dispatch(new CommonUpdateAttachmentsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonGetAttachmentsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
