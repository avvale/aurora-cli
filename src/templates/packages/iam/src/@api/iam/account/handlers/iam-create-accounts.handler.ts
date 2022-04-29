import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateAccountsCommand } from '../../../../@apps/iam/account/application/create/create-accounts.command';
import { IamCreateAccountInput } from '../../../../graphql';
import { IamCreateAccountDto } from '../dto';

@Injectable()
export class IamCreateAccountsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreateAccountInput[] | IamCreateAccountDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAccountsCommand(payload, { timezone }));
        return true;
    }
}