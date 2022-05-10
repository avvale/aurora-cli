import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetUsersQuery } from '@apps/iam/user/application/get/get-users.query';
import { UpdateUsersCommand } from '@apps/iam/user/application/update/update-users.command';
import { IamUser, IamUpdateUsersInput } from '../../../../graphql';
import { IamUserDto, IamUpdateUsersDto } from '../dto';

@Injectable()
export class IamUpdateUsersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUsersInput | IamUpdateUsersDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser | IamUserDto>
    {
        await this.commandBus.dispatch(new UpdateUsersCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint, { timezone }));
    }
}