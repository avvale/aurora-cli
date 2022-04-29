import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateUsersCommand } from '../../../../@apps/iam/user/application/create/create-users.command';
import { IamCreateUserInput } from '../../../../graphql';
import { IamCreateUserDto } from '../dto';

@Injectable()
export class IamCreateUsersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreateUserInput[] | IamCreateUserDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateUsersCommand(payload, { timezone }));
        return true;
    }
}