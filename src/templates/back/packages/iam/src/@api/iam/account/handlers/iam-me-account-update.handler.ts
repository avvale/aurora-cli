import { IamUpdateMeAccountDto } from '../dto';
import { IamUpdateMeAccountInput } from '@api/graphql';
import { IamAccountResponse, IamFindAccountByIdQuery, IamUpdateAccountByIdCommand } from '@app/iam/account';
import { IamFindUserByIdQuery, IamUpdateUserByIdCommand } from '@app/iam/user';
import { AuditingMeta, ICommandBus, IQueryBus, diff, uuid } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMeAccountUpdateHandler
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
            payload.id,
            {},
            {
                timezone,
            },
        ));

        const userStorage = await this.queryBus.ask(new IamFindUserByIdQuery(
            payload.user.id,
            {},
            {
                timezone,
            },
        ));

        const accountDataToUpdate = diff(payload, accountStorage);
        const userDataToUpdate = diff(payload.user, userStorage);

        delete accountDataToUpdate.user;

        const operationId = uuid();

        await this.commandBus.dispatch(new IamUpdateAccountByIdCommand(
            {
                ...accountStorage,
                id: payload.id,
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
            },
        ));

        // always password will be empty unless is changed
        if (userDataToUpdate.password === '') delete userDataToUpdate.password;

        await this.commandBus.dispatch(new IamUpdateUserByIdCommand(
            {
                ...userDataToUpdate,
                id: payload.user.id,
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
            },
        ));

        return true;
    }
}