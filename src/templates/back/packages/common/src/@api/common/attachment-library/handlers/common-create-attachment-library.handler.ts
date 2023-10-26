import { CommonAttachmentLibraryDto, CommonCreateAttachmentLibraryDto } from '@api/common/attachment-library';
import { CommonAttachmentLibrary, CommonCreateAttachmentLibraryInput } from '@api/graphql';
import { CommonCreateAttachmentLibraryCommand, CommonFindAttachmentLibraryByIdQuery } from '@app/common/attachment-library';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAttachmentLibraryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCreateAttachmentLibraryInput | CommonCreateAttachmentLibraryDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachmentLibrary | CommonAttachmentLibraryDto>
    {
        await this.commandBus.dispatch(new CommonCreateAttachmentLibraryCommand(
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
