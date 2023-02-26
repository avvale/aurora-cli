import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// @app
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { UpdateUserByIdCommand } from '@app/iam/user/application/update/update-user-by-id.command';
import { IamUser, IamUpdateUserByIdInput } from '@api/graphql';
import { IamUserDto, IamUpdateUserByIdDto } from '../dto';

@Injectable()
export class IamUpdateUserByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUserByIdInput | IamUpdateUserByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamUser | IamUserDto>
    {
        const user = await this.queryBus.ask(new FindUserByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, user);

        await this.commandBus.dispatch(new UpdateUserByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindUserByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));
    }
}