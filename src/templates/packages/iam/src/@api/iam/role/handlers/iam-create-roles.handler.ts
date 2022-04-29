import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateRolesCommand } from '../../../../@apps/iam/role/application/create/create-roles.command';
import { IamCreateRoleInput } from '../../../../graphql';
import { IamCreateRoleDto } from '../dto';

@Injectable()
export class IamCreateRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreateRoleInput[] | IamCreateRoleDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateRolesCommand(payload, { timezone }));
        return true;
    }
}