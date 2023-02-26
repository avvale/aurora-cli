import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { DeleteUserByIdCommand } from '@app/iam/user/application/delete/delete-user-by-id.command';
import { IamUser } from '@api/graphql';
import { IamUserDto } from '../dto';

@Injectable()
export class IamDeleteUserByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamUser | IamUserDto>
    {
        const user = await this.queryBus.ask(new FindUserByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteUserByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return user;
    }
}