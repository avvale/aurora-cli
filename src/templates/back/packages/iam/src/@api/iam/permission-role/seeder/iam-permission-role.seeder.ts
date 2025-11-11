import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

//
import {
    IamCreatePermissionsRolesCommand,
    iamMockPermissionRoleData,
} from '@app/iam/permission-role';

@Injectable()
export class IamPermissionRoleSeeder {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        await this.commandBus.dispatch(
            new IamCreatePermissionsRolesCommand(iamMockPermissionRoleData, {
                timezone: process.env.TZ,
            }),
        );

        return true;
    }
}
