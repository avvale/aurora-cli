import { CommonAttachmentFamilyDto } from '@api/common/attachment-family';
import { CommonAttachmentFamily } from '@api/graphql';
import {
  CommonDeleteAttachmentFamilyByIdCommand,
  CommonFindAttachmentFamilyByIdQuery,
} from '@app/common/attachment-family';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAttachmentFamilyByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAttachmentFamily | CommonAttachmentFamilyDto> {
    const attachmentFamily = await this.queryBus.ask(
      new CommonFindAttachmentFamilyByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new CommonDeleteAttachmentFamilyByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return attachmentFamily;
  }
}
