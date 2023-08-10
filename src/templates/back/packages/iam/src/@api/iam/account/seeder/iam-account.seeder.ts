import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreateAccountsCommand } from '@app/iam/account';
import { iamMockAccountData } from '@app/iam/account';

@Injectable()
export class IamAccountSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreateAccountsCommand(
            iamMockAccountData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
