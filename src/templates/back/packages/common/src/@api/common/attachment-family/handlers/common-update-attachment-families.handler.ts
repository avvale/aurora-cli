import { CommonAttachmentFamilyDto, CommonUpdateAttachmentFamiliesDto } from '@api/common/attachment-family';
import { CommonAttachmentFamily, CommonUpdateAttachmentFamiliesInput } from '@api/graphql';
import { CommonGetAttachmentFamiliesQuery, CommonUpdateAttachmentFamiliesCommand } from '@app/common/attachment-family';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAttachmentFamiliesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAttachmentFamiliesInput | CommonUpdateAttachmentFamiliesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachmentFamily | CommonAttachmentFamilyDto>
    {
        await this.commandBus.dispatch(new CommonUpdateAttachmentFamiliesCommand(
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

        return await this.queryBus.ask(new CommonGetAttachmentFamiliesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
