import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreatePermissionsCommand } from '@app/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';

@Injectable()
export class IamPermissionSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreatePermissionsCommand(
            iamMockPermissionData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
