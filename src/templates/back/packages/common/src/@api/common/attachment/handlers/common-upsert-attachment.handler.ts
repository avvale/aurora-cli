import {
  CommonAttachmentDto,
  CommonUpdateAttachmentByIdDto,
} from '@api/common/attachment';
import {
  CommonAttachment,
  CommonUpdateAttachmentByIdInput,
} from '@api/graphql';
import {
  CommonFindAttachmentByIdQuery,
  CommonUpsertAttachmentCommand,
} from '@app/common/attachment';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpsertAttachmentHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: CommonUpdateAttachmentByIdInput | CommonUpdateAttachmentByIdDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAttachment | CommonAttachmentDto> {
    await this.commandBus.dispatch(
      new CommonUpsertAttachmentCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new CommonFindAttachmentByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
