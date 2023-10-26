import { CommonAttachmentDto } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import { CommonFindAttachmentByIdQuery } from '@app/common/attachment';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAttachment | CommonAttachmentDto>
    {
        return await this.queryBus.ask(new CommonFindAttachmentByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
