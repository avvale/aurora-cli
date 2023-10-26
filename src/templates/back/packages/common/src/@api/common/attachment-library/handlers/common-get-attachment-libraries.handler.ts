import { CommonAttachmentLibraryDto } from '@api/common/attachment-library';
import { CommonAttachmentLibrary } from '@api/graphql';
import { CommonGetAttachmentLibrariesQuery } from '@app/common/attachment-library';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetAttachmentLibrariesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAttachmentLibrary[] | CommonAttachmentLibraryDto[]>
    {
        return await this.queryBus.ask(new CommonGetAttachmentLibrariesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
