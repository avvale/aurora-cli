import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { UpdateUserByIdCommand } from '@app/iam/user/application/update/update-user-by-id.command';
import { IamUser, IamUpdateUserByIdInput } from '@api/graphql';
import { IamUserDto, IamUpdateUserByIdDto } from '../dto';

@Injectable()
export class IamUpdateUserByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUserByIdInput | IamUpdateUserByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser | IamUserDto>
    {
        await this.commandBus.dispatch(new UpdateUserByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, constraint, { timezone }));
    }
}