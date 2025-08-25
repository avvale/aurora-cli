import { IamAccount, IamUpdateAccountsInput } from '@api/graphql';
import { IamAccountDto, IamUpdateAccountsDto } from '@api/iam/account';
import { IamAccountResponse, IamGetAccountsQuery, IamUpdateAccountsCommand } from '@app/iam/account';
import { IamPermissions } from '@app/iam/iam.types';
import { IamGetRolesQuery } from '@app/iam/role';
import { iamCreatePermissionsFromRoles } from '@app/iam/shared';
import { Arr, AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateAccountsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: IamUpdateAccountsInput | IamUpdateAccountsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
        // always delete dPermissions to avoid update it
        delete payload.dPermissions;

        if ('roleIds' in payload)
        {
            // get roles with permissions
            const roles = await this.queryBus.ask(new IamGetRolesQuery({
                where: {
                    id: payload.roleIds,
                },
                include: ['permissions'],
            }));

            const permissions = iamCreatePermissionsFromRoles(roles);

            if (
                !account.dPermissions.all.includes(IamPermissions.SUDO) &&
                !Arr.contained(permissions.all, account.dPermissions.all)
            )
            {
                throw new ConflictException({
                    message    : 'The account does not have the required permissions to update the account with the specified roles.',
                    statusCode : 401,
                    translation: 'error.106',
                });
            }

            payload['dPermissions'] = permissions;
        }

        await this.commandBus.dispatch(new IamUpdateAccountsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamGetAccountsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
