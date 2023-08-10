import { IamUpdateUsersInput, IamUser } from '@api/graphql';
import { IamUpdateUsersDto, IamUserDto } from '@api/iam/user';
import { IamGetUsersQuery, IamUpdateUsersCommand } from '@app/iam/user';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateUsersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUsersInput | IamUpdateUsersDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamUser | IamUserDto>
    {
        await this.commandBus.dispatch(new IamUpdateUsersCommand(
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

        return await this.queryBus.ask(new IamGetUsersQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
