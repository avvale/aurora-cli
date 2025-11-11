import { IamUpdateUserByIdInput, IamUser } from '@api/graphql';
import { IamUpdateUserByIdDto, IamUserDto } from '@api/iam/user';
import { IamFindUserByIdQuery, IamUpdateUserByIdCommand } from '@app/iam/user';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateUserByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUserByIdInput | IamUpdateUserByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamUser | IamUserDto> {
        const user = await this.queryBus.ask(
            new IamFindUserByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        const dataToUpdate = diff(payload, user);

        await this.commandBus.dispatch(
            new IamUpdateUserByIdCommand(
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
            ),
        );

        return await this.queryBus.ask(
            new IamFindUserByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );
    }
}
