import { IamAccount, IamAccountType, IamUpdateAccountByIdInput } from '@api/graphql';
import { IamAccountDto, IamUpdateAccountByIdDto } from '@api/iam/account';
import { IamFindAccountByIdQuery, IamUpdateAccountByIdCommand } from '@app/iam/account';
import { IamCreatePermissionsFromRolesService } from '@app/iam/permission-role/application/services/iam-create-permissions-from-roles.service';
import { IamGetRolesQuery } from '@app/iam/role';
import { IamFindUserByIdQuery, IamUpdateUserByIdCommand } from '@app/iam/user';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class IamUpdateAccountByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly createPermissionsFromRolesService: IamCreatePermissionsFromRolesService,
        private readonly sequelize: Sequelize,
    ) {}

    async main(
        payload: IamUpdateAccountByIdInput | IamUpdateAccountByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
        const account = await this.queryBus.ask(new IamFindAccountByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, account);

        if ('roleIds' in dataToUpdate)
        {
            // get roles with permissions
            const roles = await this.queryBus.ask(new IamGetRolesQuery({
                where: {
                    id: payload.roleIds,
                },
                include: ['permissions'],
            }));

            dataToUpdate['dPermissions'] = this.createPermissionsFromRolesService.main(roles);
        }

        const transaction = await this.sequelize.transaction({
            logging: message => Logger.log(message, [
                'IamUpdateAccountByIdHandler',
                `IamAccount.id: ${payload.id}`,
            ]),
        });

        try
        {
            const operationId = Utils.uuid();

            await this.commandBus.dispatch(new IamUpdateAccountByIdCommand(
                {
                    ...dataToUpdate,
                    id: payload.id,
                },
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        transaction,
                        auditing: {
                            ...auditing,
                            operationId,
                            operationSort: 1,
                        },
                    },
                },
            ));

            if (account.type === IamAccountType.USER)
            {
                const user = await this.queryBus.ask(new IamFindUserByIdQuery(payload.user.id, constraint, { timezone }));

                const dataToUpdate = Utils.diff(payload.user, user);

                // always password will be empty unless is changed
                if (dataToUpdate.password === '') delete dataToUpdate.password;

                await this.commandBus.dispatch(new IamUpdateUserByIdCommand(
                    {
                        ...dataToUpdate,
                        id: payload.user.id,
                    },
                    constraint,
                    {
                        timezone,
                        repositoryOptions: {
                            transaction,
                            auditing: {
                                ...auditing,
                                operationId,
                                operationSort: 2,
                            },
                        },
                    },
                ));
            }

            await transaction.commit();
        }
        catch (error)
        {
            await transaction.rollback();
            throw error;
        }

        return await this.queryBus.ask(new IamFindAccountByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
