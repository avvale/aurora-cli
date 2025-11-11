import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import { IamCreateAccountsCommand, iamMockAccountData } from '@app/iam/account';

@Injectable()
export class IamAccountSeeder {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        await this.commandBus.dispatch(
            new IamCreateAccountsCommand(iamMockAccountData, {
                timezone: process.env.TZ,
            }),
        );

        return true;
    }
}
