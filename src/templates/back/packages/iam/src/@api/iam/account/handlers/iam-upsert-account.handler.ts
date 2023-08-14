import { IamAccount, IamUpdateAccountByIdInput } from '@api/graphql';
import { IamAccountDto, IamUpdateAccountByIdDto } from '@api/iam/account';
import { IamFindAccountByIdQuery, IamUpsertAccountCommand } from '@app/iam/account';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpsertAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateAccountByIdInput | IamUpdateAccountByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
        await this.commandBus.dispatch(new IamUpsertAccountCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindAccountByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
