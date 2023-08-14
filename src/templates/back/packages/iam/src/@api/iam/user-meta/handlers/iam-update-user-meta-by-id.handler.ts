import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { IamFindUserByIdQuery, IamUpdateUserByIdCommand } from '@app/iam/user';
import { IamAccountResponse } from '@app/iam/account';
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
        account: IamAccountResponse,
        timezone?: string,
    ): Promise<IamUserMeta | IamUserMetaDto>
    {
        await this.commandBus.dispatch(new IamUpdateUserByIdCommand(
            {
                ...payload,
                id: account.user.id,
            },
            {},
            { timezone },
        ));

        return await this.queryBus.ask(new IamFindUserByIdQuery(
            account.user.id,
            {},
            {
                timezone,
            },
        ));
    }
}