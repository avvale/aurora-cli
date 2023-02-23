import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreatePermissionsCommand } from '@app/iam/permission/application/create/create-permissions.command';
import { permissions } from '@app/iam/permission/infrastructure/mock/mock-permission.data';

@Injectable()
export class IamPermissionSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreatePermissionsCommand(
            permissions,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}