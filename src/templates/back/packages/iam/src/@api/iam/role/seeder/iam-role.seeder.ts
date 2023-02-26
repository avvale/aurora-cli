import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreateRolesCommand } from '@app/iam/role/application/create/create-roles.command';
import { roles } from '@app/iam/role/infrastructure/mock/mock-role.data';

@Injectable()
export class IamRoleSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateRolesCommand(
            roles,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}