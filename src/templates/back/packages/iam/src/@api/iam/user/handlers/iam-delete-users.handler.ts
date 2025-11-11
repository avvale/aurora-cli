import { IamUser } from '@api/graphql';
import { IamUserDto } from '@api/iam/user';
import { IamDeleteUsersCommand, IamGetUsersQuery } from '@app/iam/user';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteUsersHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamUser[] | IamUserDto[]> {
        const users = await this.queryBus.ask(
            new IamGetUsersQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new IamDeleteUsersCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return users;
    }
}
