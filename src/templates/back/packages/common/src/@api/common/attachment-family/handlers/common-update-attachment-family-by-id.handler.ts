import {
  CommonAttachmentFamilyDto,
  CommonUpdateAttachmentFamilyByIdDto,
} from '@api/common/attachment-family';
import {
  CommonAttachmentFamily,
  CommonUpdateAttachmentFamilyByIdInput,
} from '@api/graphql';
import {
  CommonFindAttachmentFamilyByIdQuery,
  CommonUpdateAttachmentFamilyByIdCommand,
} from '@app/common/attachment-family';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
  diff,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateAttachmentFamilyByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload:
      | CommonUpdateAttachmentFamilyByIdInput
      | CommonUpdateAttachmentFamilyByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAttachmentFamily | CommonAttachmentFamilyDto> {
    const attachmentFamily = await this.queryBus.ask(
      new CommonFindAttachmentFamilyByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, attachmentFamily);

    await this.commandBus.dispatch(
      new CommonUpdateAttachmentFamilyByIdCommand(
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
      ),
    );

    return await this.queryBus.ask(
      new CommonFindAttachmentFamilyByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
