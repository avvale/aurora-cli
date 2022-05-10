import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '@apps/iam/account/application/find/find-account-by-id.query';
import { UpdateAccountByIdCommand } from '@apps/iam/account/application/update/update-account-by-id.command';
import { IamAccount, IamUpdateAccountByIdInput } from '../../../../graphql';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';

@Injectable()
export class IamUpdateAccountByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateAccountByIdInput | IamUpdateAccountByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount | IamAccountDto>
    {
        await this.commandBus.dispatch(new UpdateAccountByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, constraint, { timezone }));
    }
}