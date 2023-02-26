import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';
import { Sequelize } from 'sequelize-typescript';

// @app
import { FindAccountByIdQuery } from '@app/iam/account/application/find/find-account-by-id.query';
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { UpdateAccountByIdCommand } from '@app/iam/account/application/update/update-account-by-id.command';
import { IamAccount, IamAccountType, IamUpdateAccountByIdInput } from '@api/graphql';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';
import { GetRolesQuery } from '@app/iam/role/application/get/get-roles.query';
import { IamCreatePermissionsFromRolesService } from '@app/iam/permission-role/application/services/iam-create-permissions-from-roles.service';
import { UpdateUserByIdCommand } from '@app/iam/user/application/update/update-user-by-id.command';

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
        const account = await this.queryBus.ask(new FindAccountByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, account);

        if ('roleIds' in dataToUpdate)
        {
            // get roles with permissions
            const roles = await this.queryBus.ask(new GetRolesQuery({
                where: {
                    id: payload.roleIds,
                },
                include: ['permissions'],
            }));

            dataToUpdate['dPermissions'] = this.createPermissionsFromRolesService.main(roles);
        }

        const transaction = await this.sequelize.transaction({
            // logging: console.log,  // Just for debugging purposes
        });

        try
        {
            const operationId = Utils.uuid();

            await this.commandBus.dispatch(new UpdateAccountByIdCommand(
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
                const user = await this.queryBus.ask(new FindUserByIdQuery(payload.user.id, constraint, { timezone }));

                const dataToUpdate = Utils.diff(payload.user, user);

                // always password will be empty unless is changed
                if (dataToUpdate.password === '') delete dataToUpdate.password;

                await this.commandBus.dispatch(new UpdateUserByIdCommand(
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

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, constraint, { timezone }));
    }
}