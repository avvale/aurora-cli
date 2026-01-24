import { CommonAttachmentLibraryDto } from '@api/common/attachment-library';
import { CommonAttachmentLibrary } from '@api/graphql';
import {
  CommonDeleteAttachmentLibrariesCommand,
  CommonGetAttachmentLibrariesQuery,
} from '@app/common/attachment-library';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteAttachmentLibrariesHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<CommonAttachmentLibrary[] | CommonAttachmentLibraryDto[]> {
    const attachmentLibraries = await this.queryBus.ask(
      new CommonGetAttachmentLibrariesQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new CommonDeleteAttachmentLibrariesCommand(queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return attachmentLibraries;
  }
}
