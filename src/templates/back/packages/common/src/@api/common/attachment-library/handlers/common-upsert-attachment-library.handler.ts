import { CommonAttachmentLibraryDto, CommonUpdateAttachmentLibraryByIdDto } from '@api/common/attachment-library';
import { CommonAttachmentLibrary, CommonUpdateAttachmentLibraryByIdInput } from '@api/graphql';
import { CommonFindAttachmentLibraryByIdQuery, CommonUpsertAttachmentLibraryCommand } from '@app/common/attachment-library';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpsertAttachmentLibraryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAttachmentLibraryByIdInput | CommonUpdateAttachmentLibraryByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachmentLibrary | CommonAttachmentLibraryDto>
    {
        await this.commandBus.dispatch(new CommonUpsertAttachmentLibraryCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindAttachmentLibraryByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
