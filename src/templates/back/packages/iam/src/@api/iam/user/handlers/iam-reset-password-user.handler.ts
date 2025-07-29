import { IamResetPasswordUserDto } from '../dto';
import { IamResetPasswordUserInput } from '@api/graphql';
import { IamFindUserQuery, IamUpdateUserByIdCommand } from '@app/iam/user';
import { AuditingMeta, dateFromFormat, ICommandBus, IQueryBus, now } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class IamResetPasswordUserHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamResetPasswordUserInput | IamResetPasswordUserDto,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        const decodedToken = atob(payload.token);
        const accountId = decodedToken.slice(0, 36);
        const requestAt = decodedToken.slice(36, -36);
        const randomUuid = decodedToken.slice(-36);

        if (!dateFromFormat(requestAt, 'YYYYMMDDHHmmss', true).isValid())
        {
            throw new BadRequestException({ message: 'Invalid token' });
        }

        if (dateFromFormat(requestAt, 'YYYYMMDDHHmmss').add(1, 'hour').isBefore(now()))
        {
            throw new BadRequestException({ message: 'Token expired' });
        }

        const user = await this.queryBus.ask(new IamFindUserQuery(
            {
                where: {
                    rememberToken: payload.token,
                },
            },
        ));

        await this.commandBus.dispatch(new IamUpdateUserByIdCommand(
            {
                id           : user.id,
                password     : payload.password,
                rememberToken: null,
            },
            {},
            {
                repositoryOptions: {
                    auditing,
                },
                meta: {
                    from       : IamResetPasswordUserHandler.name,
                    rawPassword: payload.password,
                },
            },
        ));

        return true;
    }
}