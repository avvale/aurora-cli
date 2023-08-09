import { CommonAttachmentFamilyDto } from '@api/common/attachment-family';
import { CommonAttachmentFamily } from '@api/graphql';
import { CommonDeleteAttachmentFamiliesCommand, CommonGetAttachmentFamiliesQuery } from '@app/common/attachment-family';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAttachmentFamiliesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachmentFamily[] | CommonAttachmentFamilyDto[]>
    {
        const attachmentFamilies = await this.queryBus.ask(new CommonGetAttachmentFamiliesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteAttachmentFamiliesCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return attachmentFamilies;
    }
}
