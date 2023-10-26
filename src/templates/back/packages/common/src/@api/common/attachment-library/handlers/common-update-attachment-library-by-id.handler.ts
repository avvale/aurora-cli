import { CommonAttachmentLibraryDto, CommonUpdateAttachmentLibraryByIdDto } from '@api/common/attachment-library';
import { CommonAttachmentLibrary, CommonUpdateAttachmentLibraryByIdInput } from '@api/graphql';
import { CommonFindAttachmentLibraryByIdQuery, CommonUpdateAttachmentLibraryByIdCommand } from '@app/common/attachment-library';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAttachmentLibraryByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAttachmentLibraryByIdInput | CommonUpdateAttachmentLibraryByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachmentLibrary | CommonAttachmentLibraryDto>
    {
        const attachmentLibrary = await this.queryBus.ask(new CommonFindAttachmentLibraryByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, attachmentLibrary);

        await this.commandBus.dispatch(new CommonUpdateAttachmentLibraryByIdCommand(
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

        return await this.queryBus.ask(new CommonFindAttachmentLibraryByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
