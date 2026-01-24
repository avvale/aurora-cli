import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  CommonCreateAttachmentLibrariesCommand,
  commonMockAttachmentLibraryData,
} from '@app/common/attachment-library';

@Injectable()
export class CommonAttachmentLibrarySeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateAttachmentLibrariesCommand(
        commonMockAttachmentLibraryData,
        {
          timezone: process.env.TZ,
        },
      ),
    );

    return true;
  }
}
