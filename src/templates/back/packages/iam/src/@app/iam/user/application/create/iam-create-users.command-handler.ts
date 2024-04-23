/* eslint-disable key-spacing */
import { IamCreateUsersCommand } from '@app/iam/user';
import { IamCreateUsersService } from '@app/iam/user/application/create/iam-create-users.service';
import {
    IamUserAccountId,
    IamUserAvatar,
    IamUserId,
    IamUserIsTwoFactorAuthenticationEnabled,
    IamUserLangId,
    IamUserMeta,
    IamUserMobile,
    IamUserName,
    IamUserPassword,
    IamUserRememberToken,
    IamUserSurname,
    IamUserTwoFactorAuthenticationSecret,
} from '@app/iam/user/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateUsersCommand)
export class IamCreateUsersCommandHandler implements ICommandHandler<IamCreateUsersCommand>
{
    constructor(
        private readonly createUsersService: IamCreateUsersService,
    ) {}

    async execute(command: IamCreateUsersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createUsersService.main(
            command.payload
                .map(user =>
                {
                    return {
                        id: new IamUserId(user.id),
                        accountId: new IamUserAccountId(user.accountId),
                        name: new IamUserName(user.name),
                        surname: new IamUserSurname(user.surname),
                        avatar: new IamUserAvatar(user.avatar),
                        mobile: new IamUserMobile(user.mobile),
                        langId: new IamUserLangId(user.langId),
                        password: new IamUserPassword(user.password, {}, { haveToEncrypt: true }),
                        isTwoFactorAuthenticationEnabled: new IamUserIsTwoFactorAuthenticationEnabled(user.isTwoFactorAuthenticationEnabled),
                        twoFactorAuthenticationSecret: new IamUserTwoFactorAuthenticationSecret(user.twoFactorAuthenticationSecret),
                        rememberToken: new IamUserRememberToken(user.rememberToken),
                        meta: new IamUserMeta(user.meta),
                    };
                }),
            command.cQMetadata,
        );
    }
}
