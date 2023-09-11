import { IamRoleAccount } from '@api/graphql';
import { IamRoleAccountDto } from '@api/iam/role-account';
import { IamFindRoleAccountByIdQuery } from '@app/iam/role-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindRoleAccountByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        roleId: string,
        accountId: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRoleAccount | IamRoleAccountDto>
    {
        return await this.queryBus.ask(new IamFindRoleAccountByIdQuery(
            roleId,
            accountId,
            constraint,
            {
                timezone,
            },
        ));
    }
}
