import { IamRoleAccount, IamUpdateRoleAccountByIdInput } from '@api/graphql';
import { IamRoleAccountDto, IamUpdateRoleAccountByIdDto } from '@api/iam/role-account';
import { IamFindRoleAccountByIdQuery, IamUpsertRoleAccountCommand } from '@app/iam/role-account';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpsertRoleAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRoleAccountByIdInput | IamUpdateRoleAccountByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRoleAccount | IamRoleAccountDto>
    {
        await this.commandBus.dispatch(new IamUpsertRoleAccountCommand(
            payload,
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
            {},
            {
                timezone,
            },
        ));
    }
}
