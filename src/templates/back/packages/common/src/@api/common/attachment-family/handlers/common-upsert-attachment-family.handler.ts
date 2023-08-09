import { CommonAttachmentFamilyDto, CommonUpdateAttachmentFamilyByIdDto } from '@api/common/attachment-family';
import { CommonAttachmentFamily, CommonUpdateAttachmentFamilyByIdInput } from '@api/graphql';
import { CommonFindAttachmentFamilyByIdQuery, CommonUpsertAttachmentFamilyCommand } from '@app/common/attachment-family';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpsertAttachmentFamilyHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAttachmentFamilyByIdInput | CommonUpdateAttachmentFamilyByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAttachmentFamily | CommonAttachmentFamilyDto>
    {
        await this.commandBus.dispatch(new CommonUpsertAttachmentFamilyCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindAttachmentFamilyByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
