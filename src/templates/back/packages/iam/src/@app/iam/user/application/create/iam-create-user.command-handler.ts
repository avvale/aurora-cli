/* eslint-disable key-spacing */
import { IamCreateUserCommand } from '@app/iam/user';
import { IamCreateUserService } from '@app/iam/user/application/create/iam-create-user.service';
import {
    IamUserAccountId,
    IamUserAvatar,
    IamUserId,
    IamUserLangId,
    IamUserMeta,
    IamUserMobile,
    IamUserName,
    IamUserPassword,
    IamUserRememberToken,
    IamUserSurname,
    IamUserUsername,
} from '@app/iam/user/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateUserCommand)
export class IamCreateUserCommandHandler implements ICommandHandler<IamCreateUserCommand>
{
    constructor(
        private readonly createUserService: IamCreateUserService,
    ) {}

    async execute(command: IamCreateUserCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createUserService.main(
            {
                id: new IamUserId(command.payload.id),
                accountId: new IamUserAccountId(command.payload.accountId),
                name: new IamUserName(command.payload.name),
                surname: new IamUserSurname(command.payload.surname),
                avatar: new IamUserAvatar(command.payload.avatar),
                mobile: new IamUserMobile(command.payload.mobile),
                langId: new IamUserLangId(command.payload.langId),
                username: new IamUserUsername(command.payload.username),
                password: new IamUserPassword(command.payload.password, {}, { haveToEncrypt: true }),
                rememberToken: new IamUserRememberToken(command.payload.rememberToken),
                meta: new IamUserMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
