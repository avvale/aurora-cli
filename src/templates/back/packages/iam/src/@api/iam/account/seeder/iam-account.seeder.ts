import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateAccountsCommand } from '@app/iam/account/application/create/create-accounts.command';
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';

@Injectable()
export class IamAccountSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAccountsCommand(
            accounts,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}