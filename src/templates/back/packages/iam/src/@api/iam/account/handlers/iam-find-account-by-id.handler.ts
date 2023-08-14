import { IamAccount } from '@api/graphql';
import { IamAccountDto } from '@api/iam/account';
import { IamFindAccountByIdQuery } from '@app/iam/account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new IamFindAccountByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
