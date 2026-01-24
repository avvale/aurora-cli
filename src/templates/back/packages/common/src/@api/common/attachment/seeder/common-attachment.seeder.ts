import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
  CommonCreateAttachmentsCommand,
  commonMockAttachmentData,
} from '@app/common/attachment';

@Injectable()
export class CommonAttachmentSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new CommonCreateAttachmentsCommand(commonMockAttachmentData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
