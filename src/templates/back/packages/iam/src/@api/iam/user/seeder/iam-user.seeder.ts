import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import { IamCreateUsersCommand, iamMockUserData } from '@app/iam/user';

@Injectable()
export class IamUserSeeder {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(): Promise<boolean> {
    await this.commandBus.dispatch(
      new IamCreateUsersCommand(iamMockUserData, {
        timezone: process.env.TZ,
      }),
    );

    return true;
  }
}
