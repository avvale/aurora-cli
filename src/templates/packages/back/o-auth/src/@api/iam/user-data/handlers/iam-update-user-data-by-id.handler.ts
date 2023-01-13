import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { UpdateUserByIdCommand } from '@app/iam/user/application/update/update-user-by-id.command';
import { AccountResponse } from '@app/iam/account/domain/account.response';
import { IamUserData, IamUpdateUserDataByIdInput } from '@api/graphql';
import { IamUserDataDto, IamUpdateUserDataByIdDto } from '../dto';

@Injectable()
export class IamUpdateUserDataByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUserDataByIdInput | IamUpdateUserDataByIdDto,
        account: AccountResponse,
        timezone?: string,
    ): Promise<IamUserData | IamUserDataDto>
    {
        await this.commandBus.dispatch(new UpdateUserByIdCommand({ ...payload, id: account.user.id }, {}, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(account.user.id, {}, { timezone }));
    }
}