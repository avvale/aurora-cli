import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { UpsertUserCommand } from '@app/iam/user/application/upsert/upsert-user.command';
import { IamUser, IamUpdateUserByIdInput } from '@api/graphql';
import { IamUserDto, IamUpdateUserByIdDto } from '../dto';

@Injectable()
export class IamUpsertUserHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateUserByIdInput | IamUpdateUserByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamUser | IamUserDto>
    {
        await this.commandBus.dispatch(new UpsertUserCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindUserByIdQuery(
            payload.id,
            {},
            { timezone },
        ));
    }
}