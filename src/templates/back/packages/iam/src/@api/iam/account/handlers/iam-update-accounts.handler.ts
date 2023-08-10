import { IamAccount, IamUpdateAccountsInput } from '@api/graphql';
import { IamAccountDto, IamUpdateAccountsDto } from '@api/iam/account';
import { IamGetAccountsQuery, IamUpdateAccountsCommand } from '@app/iam/account';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateAccountsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateAccountsInput | IamUpdateAccountsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
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
