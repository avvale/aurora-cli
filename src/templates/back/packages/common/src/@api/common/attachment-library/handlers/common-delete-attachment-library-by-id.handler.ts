import { CommonAttachmentLibraryDto } from '@api/common/attachment-library';
import { CommonAttachmentLibrary } from '@api/graphql';
import {
  CommonDeleteAttachmentLibraryByIdCommand,
  CommonFindAttachmentLibraryByIdQuery,
} from '@app/common/attachment-library';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAttachmentLibraryByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAttachmentLibrary | CommonAttachmentLibraryDto> {
    const attachmentLibrary = await this.queryBus.ask(
      new CommonFindAttachmentLibraryByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new CommonDeleteAttachmentLibraryByIdCommand(id, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return attachmentLibrary;
  }
}
