import { CommonAttachmentDto } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import { CommonDeleteAttachmentByIdCommand, CommonFindAttachmentByIdQuery } from '@app/common/attachment';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { CommonAttachmentsService } from '@api/common/shared';
import { CommonDeleteAttachmentLibraryByIdCommand } from '@app/common/attachment-library';
import * as _ from 'lodash';

@Injectable()
export class CommonDeleteAttachmentByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly commonAttachmentsService: CommonAttachmentsService,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachment | CommonAttachmentDto>
    {
        const attachment = await this.queryBus.ask(new CommonFindAttachmentByIdQuery(
            id,
            _.merge(
                constraint,
                {
                    include: [
                        { association: 'library' },
                    ],
                },
            ),
            {
                timezone,
            },
        ));

        // delete attachment file, attachment library file and attachment sizes if exists
        this.commonAttachmentsService.deleteAttachmentFile(attachment);

        await this.commandBus.dispatch(new CommonDeleteAttachmentByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        // can to haven't a library isn't a image
        if (attachment.library)
        {
            await this.commandBus.dispatch(new CommonDeleteAttachmentLibraryByIdCommand(
                attachment.library.id,
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ));
        }

        return attachment;
    }
}
