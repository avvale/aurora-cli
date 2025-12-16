import { IamRoleAccount, IamUpdateRoleAccountByIdInput } from '@api/graphql';
import {
    IamFindRoleAccountByIdQuery,
    IamUpdateRoleAccountByIdCommand,
} from '@app/iam/role-account';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamUpdateRoleAccountByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRoleAccountByIdInput,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRoleAccount> {
        const roleAccount = await this.queryBus.ask(
            new IamFindRoleAccountByIdQuery(
                payload.roleId,
                payload.accountId,
                constraint,
                {
                    timezone,
                },
            ),
        );

        if (!roleAccount) {
            throw new NotFoundException(
                `IamRoleAccount with roleId: ${payload.roleId} accountId: ${payload.accountId}, not found`,
            );
        }

        const dataToUpdate = diff(payload, roleAccount);

        await this.commandBus.dispatch(
            new IamUpdateRoleAccountByIdCommand(
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
            ),
        );

        return await this.queryBus.ask(
            new IamFindRoleAccountByIdQuery(
                payload.roleId,
                payload.accountId,
                constraint,
                {
                    timezone,
                },
            ),
        );
    }
}
