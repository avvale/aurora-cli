import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurora-ts/core';

// @app
import { CreateUsersCommand } from '@app/iam/user/application/create/create-users.command';
import { IamCreateUserInput } from '@api/graphql';
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