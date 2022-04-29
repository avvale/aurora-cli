import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { UpdateAccountCommand } from '../../../../@apps/iam/account/application/update/update-account.command';
import { IamAccount, IamUpdateAccountInput } from '../../../../graphql';
import { IamAccountDto, IamUpdateAccountDto } from '../dto';

@Injectable()
export class IamUpdateAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateAccountInput | IamUpdateAccountDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount | IamAccountDto>
    {
        await this.commandBus.dispatch(new UpdateAccountCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, constraint, { timezone }));
    }
}