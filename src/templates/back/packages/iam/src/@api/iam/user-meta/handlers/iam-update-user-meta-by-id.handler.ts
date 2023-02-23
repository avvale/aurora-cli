import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { UpdateUserByIdCommand } from '@app/iam/user/application/update/update-user-by-id.command';
import { AccountResponse } from '@app/iam/account/domain/account.response';
import { IamUserMeta, IamUpdateUserMetaByIdInput } from '@api/graphql';
import { IamUserMetaDto, IamUpdateUserMetaByIdDto } from '../dto';

@Injectable()
export class IamUpdateUserMetaByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUserMetaByIdInput | IamUpdateUserMetaByIdDto,
        account: AccountResponse,
        timezone?: string,
    ): Promise<IamUserMeta | IamUserMetaDto>
    {
        await this.commandBus.dispatch(new UpdateUserByIdCommand(
            {
                ...payload,
                id: account.user.id,
            },
            {},
            { timezone },
        ));

        return await this.queryBus.ask(new FindUserByIdQuery(account.user.id, {}, { timezone }));
    }
}