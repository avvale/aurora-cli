/* eslint-disable key-spacing */
import { IamUpdateUserByIdCommand } from '@app/iam/user';
import { IamUpdateUserByIdService } from '@app/iam/user/application/update/iam-update-user-by-id.service';
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

@CommandHandler(IamUpdateUserByIdCommand)
export class IamUpdateUserByIdCommandHandler
    implements ICommandHandler<IamUpdateUserByIdCommand>
{
    constructor(
        private readonly updateUserByIdService: IamUpdateUserByIdService,
    ) {}

    async execute(command: IamUpdateUserByIdCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateUserByIdService.main(
            {
                id: new IamUserId(command.payload.id),
                accountId: new IamUserAccountId(command.payload.accountId, {
                    undefinable: true,
                }),
                name: new IamUserName(command.payload.name, {
                    undefinable: true,
                }),
                surname: new IamUserSurname(command.payload.surname),
                avatar: new IamUserAvatar(command.payload.avatar),
                mobile: new IamUserMobile(command.payload.mobile),
                langId: new IamUserLangId(command.payload.langId),
                password: new IamUserPassword(
                    command.payload.password,
                    { undefinable: true },
                    { haveToEncrypt: true },
                ),
                isTwoFactorAuthenticationEnabled:
                    new IamUserIsTwoFactorAuthenticationEnabled(
                        command.payload.isTwoFactorAuthenticationEnabled,
                        { undefinable: true },
                    ),
                twoFactorAuthenticationSecret:
                    new IamUserTwoFactorAuthenticationSecret(
                        command.payload.twoFactorAuthenticationSecret,
                    ),
                rememberToken: new IamUserRememberToken(
                    command.payload.rememberToken,
                ),
                meta: new IamUserMeta(command.payload.meta),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
