import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreateUsersCommand } from '@app/iam/user';
import { iamMockUserData } from '@app/iam/user';

@Injectable()
export class IamUserSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreateUsersCommand(
            iamMockUserData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
