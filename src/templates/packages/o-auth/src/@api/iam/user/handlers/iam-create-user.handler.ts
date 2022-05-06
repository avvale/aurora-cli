import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindUserByIdQuery } from '../../../../@apps/iam/user/application/find/find-user-by-id.query';
import { CreateUserCommand } from '../../../../@apps/iam/user/application/create/create-user.command';
import { IamUser, IamCreateUserInput } from '../../../../graphql';
import { IamUserDto, IamCreateUserDto } from '../dto';

@Injectable()
export class IamCreateUserHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreateUserInput | IamCreateUserDto,
        timezone?: string,
    ): Promise<IamUser | IamUserDto>
    {
        await this.commandBus.dispatch(new CreateUserCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, {}, { timezone }));
    }
}