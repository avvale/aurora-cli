import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreatePermissionsCommand } from '../../../../@apps/iam/permission/application/create/create-permissions.command';
import { IamCreatePermissionInput } from '../../../../graphql';
import { IamCreatePermissionDto } from '../dto';

@Injectable()
export class IamCreatePermissionsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreatePermissionInput[] | IamCreatePermissionDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreatePermissionsCommand(payload, { timezone }));
        return true;
    }
}