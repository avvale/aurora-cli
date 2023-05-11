import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetUsersQuery } from '@app/iam/user/application/get/get-users.query';
import { UpdateUsersCommand } from '@app/iam/user/application/update/update-users.command';
import { IamUser, IamUpdateUsersInput } from '@api/graphql';
import { IamUserDto, IamUpdateUsersDto } from '../dto';

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
        await this.commandBus.dispatch(new UpdateUsersCommand(
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

        return await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint, { timezone }));
    }
}