import { CommonAttachmentLibraryDto, CommonUpdateAttachmentLibrariesDto } from '@api/common/attachment-library';
import { CommonAttachmentLibrary, CommonUpdateAttachmentLibrariesInput } from '@api/graphql';
import { CommonGetAttachmentLibrariesQuery, CommonUpdateAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAttachmentLibrariesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAttachmentLibrariesInput | CommonUpdateAttachmentLibrariesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachmentLibrary | CommonAttachmentLibraryDto>
    {
        await this.commandBus.dispatch(new CommonUpdateAttachmentLibrariesCommand(
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

        return await this.queryBus.ask(new CommonGetAttachmentLibrariesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
