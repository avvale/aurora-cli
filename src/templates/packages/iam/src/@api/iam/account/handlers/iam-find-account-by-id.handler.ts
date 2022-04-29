import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { IamAccount } from '../../../../graphql';
import { IamAccountDto } from '../dto';

@Injectable()
export class IamFindAccountByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount | IamAccountDto>
    {
        return await this.queryBus.ask(new FindAccountByIdQuery(id, constraint, { timezone }));
    }
}