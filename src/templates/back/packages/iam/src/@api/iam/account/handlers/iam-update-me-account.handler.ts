import { IamAccountResponse, IamFindAccountByIdQuery, IamUpdateAccountByIdCommand } from '@app/iam/account';
import { IamUpdateMeAccountDto } from '../dto';
import { IamUpdateMeAccountInput } from '@api/graphql';
import { IamFindUserByIdQuery, IamUpdateUserByIdCommand } from '@app/iam/user';
import { AuditingMeta, ICommandBus, IQueryBus, diff, uuid } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateMeAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        account: IamAccountResponse,
        payload: IamUpdateMeAccountInput | IamUpdateMeAccountDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        const accountStorage = await this.queryBus.ask(new IamFindAccountByIdQuery(
            account.id,
            {},
            {
                timezone,
            },
        ));

        const userStorage = await this.queryBus.ask(new IamFindUserByIdQuery(
            account.user.id,
            {},
            {
                timezone,
            },
        ));

        const accountDataToUpdate = diff(payload, accountStorage);
        const userDataToUpdate = diff(payload.user, userStorage);

        delete accountDataToUpdate.user;

        const operationId = uuid();

        if (
            !(
                Object.keys(accountDataToUpdate).length === 1 &&
                Object.keys(accountDataToUpdate).includes('id')
            )
        )
        {
            await this.commandBus.dispatch(new IamUpdateAccountByIdCommand(
                {
                    ...accountDataToUpdate,
                    id: account.id,
                },
                {},
                {
                    timezone,
                    repositoryOptions: {
                        auditing: {
                            ...auditing,
                            operationId,
                            operationSort: 1,
                        },
                    },
                    meta: {
                        from: IamUpdateMeAccountHandler.name,
                    },
                },
            ));
        }

        // always password will be empty unless is changed
        if (userDataToUpdate.password === '') delete userDataToUpdate.password;

        await this.commandBus.dispatch(new IamUpdateUserByIdCommand(
            {
                ...userDataToUpdate,
                id: account.user.id,
            },
            {},
            {
                timezone,
                repositoryOptions: {
                    auditing: {
                        ...auditing,
                        operationId,
                        operationSort: 2,
                    },
                },
                meta: {
                    from       : IamUpdateMeAccountHandler.name,
                    rawPassword: userDataToUpdate.password,
                },
            },
        ));

        return true;
    }
}