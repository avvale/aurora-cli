import { IamRoleAccount } from '@api/graphql';
import { IamRoleAccountDto } from '@api/iam/role-account';
import { IamDeleteRoleAccountByIdCommand, IamFindRoleAccountByIdQuery } from '@app/iam/role-account';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteRoleAccountByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        roleId: string,
        accountId: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRoleAccount | IamRoleAccountDto>
    {
        const roleAccount = await this.queryBus.ask(new IamFindRoleAccountByIdQuery(
            roleId,
            accountId,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new IamDeleteRoleAccountByIdCommand(
            roleId,
            accountId,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return roleAccount;
    }
}
