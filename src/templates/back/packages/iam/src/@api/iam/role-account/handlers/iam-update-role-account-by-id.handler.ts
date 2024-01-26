import { IamRoleAccount, IamUpdateRoleAccountByIdInput } from '@api/graphql';
import { IamRoleAccountDto, IamUpdateRoleAccountByIdDto } from '@api/iam/role-account';
import { IamFindRoleAccountByIdQuery, IamUpdateRoleAccountByIdCommand } from '@app/iam/role-account';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, diff } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateRoleAccountByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRoleAccountByIdInput | IamUpdateRoleAccountByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRoleAccount | IamRoleAccountDto>
    {
        const roleAccount = await this.queryBus.ask(new IamFindRoleAccountByIdQuery(
            payload.roleId,
            payload.accountId,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, roleAccount);

        await this.commandBus.dispatch(new IamUpdateRoleAccountByIdCommand(
            {
                ...dataToUpdate,
                roleId: payload.roleId,
                accountId: payload.accountId,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindRoleAccountByIdQuery(
            payload.roleId,
            payload.accountId,
            constraint,
            {
                timezone,
            },
        ));
    }
}
