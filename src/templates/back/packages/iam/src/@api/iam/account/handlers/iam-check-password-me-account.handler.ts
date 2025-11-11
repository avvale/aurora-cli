import { IamAccountResponse } from '@app/iam/account';
import { IamFindUserByUsernamePasswordQuery } from '@app/iam/user';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCheckPasswordMeAccountHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        password: string,
    ): Promise<boolean> {
        const user = await this.queryBus.ask(
            new IamFindUserByUsernamePasswordQuery(account.username, password),
        );

        return !!user;
    }
}
