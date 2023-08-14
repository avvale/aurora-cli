import { IamUpdateUserByIdInput, IamUser } from '@api/graphql';
import { IamUpdateUserByIdDto, IamUserDto } from '@api/iam/user';
import { IamFindUserByIdQuery, IamUpsertUserCommand } from '@app/iam/user';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new IamUpsertUserCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindUserByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
