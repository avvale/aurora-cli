import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindUserByIdQuery } from '../../../../@apps/iam/user/application/find/find-user-by-id.query';
import { UpdateUserCommand } from '../../../../@apps/iam/user/application/update/update-user.command';
import { IamUser, IamUpdateUserInput } from '../../../../graphql';
import { IamUserDto, IamUpdateUserDto } from '../dto';

@Injectable()
export class IamUpdateUserHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUserInput | IamUpdateUserDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser | IamUserDto>
    {
        await this.commandBus.dispatch(new UpdateUserCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, constraint, { timezone }));
    }
}