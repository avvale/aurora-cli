import { CommonAttachmentLibraryDto } from '@api/common/attachment-library';
import { CommonAttachmentLibrary } from '@api/graphql';
import { CommonFindAttachmentLibraryByIdQuery } from '@app/common/attachment-library';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentLibraryByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAttachmentLibrary | CommonAttachmentLibraryDto>
    {
        return await this.queryBus.ask(new CommonFindAttachmentLibraryByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
