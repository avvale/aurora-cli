import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreateUsersCommand } from '@app/iam/user/application/create/create-users.command';
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

@Injectable()
export class IamUserSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateUsersCommand(
            users,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}