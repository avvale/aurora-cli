import { CommonCreateAttachmentLibraryDto } from '@api/common/attachment-library';
import { CommonCreateAttachmentLibraryInput } from '@api/graphql';
import { CommonCreateAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAttachmentLibrariesHandler {
  constructor(private readonly commandBus: ICommandBus) {}

  async main(
    payload:
      | CommonCreateAttachmentLibraryInput[]
      | CommonCreateAttachmentLibraryDto[],
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateAttachmentLibrariesCommand(payload, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return true;
  }
}
