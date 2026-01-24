import {
  CommonAttachmentFamilyDto,
  CommonCreateAttachmentFamilyDto,
} from '@api/common/attachment-family';
import {
  CommonAttachmentFamily,
  CommonCreateAttachmentFamilyInput,
} from '@api/graphql';
import {
  CommonCreateAttachmentFamilyCommand,
  CommonFindAttachmentFamilyByIdQuery,
} from '@app/common/attachment-family';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAttachmentFamilyHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload:
      | CommonCreateAttachmentFamilyInput
      | CommonCreateAttachmentFamilyDto,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAttachmentFamily | CommonAttachmentFamilyDto> {
    await this.commandBus.dispatch(
      new CommonCreateAttachmentFamilyCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return await this.queryBus.ask(
      new CommonFindAttachmentFamilyByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
