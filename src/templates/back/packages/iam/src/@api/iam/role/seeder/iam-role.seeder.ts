import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreateRolesCommand } from '@app/iam/role';
import { iamMockRoleData } from '@app/iam/role';

@Injectable()
export class IamRoleSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreateRolesCommand(
            iamMockRoleData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
