import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreateRolesAccountsCommand } from '@app/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';

@Injectable()
export class IamRoleAccountSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreateRolesAccountsCommand(
            iamMockRoleAccountData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
