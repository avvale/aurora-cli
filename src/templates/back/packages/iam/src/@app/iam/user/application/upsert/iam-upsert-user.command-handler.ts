/* eslint-disable key-spacing */
import { IamUpsertUserCommand } from '@app/iam/user';
import { IamUpsertUserService } from '@app/iam/user/application/upsert/iam-upsert-user.service';
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

@CommandHandler(IamUpsertUserCommand)
export class IamUpsertUserCommandHandler implements ICommandHandler<IamUpsertUserCommand>
{
    constructor(
        private readonly upsertUserService: IamUpsertUserService,
    ) {}

    async execute(command: IamUpsertUserCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertUserService.main(
            {
                id: new IamUserId(command.payload.id),
                accountId: new IamUserAccountId(command.payload.accountId),
                name: new IamUserName(command.payload.name),
                surname: new IamUserSurname(command.payload.surname),
                avatar: new IamUserAvatar(command.payload.avatar),
                mobile: new IamUserMobile(command.payload.mobile),
                langId: new IamUserLangId(command.payload.langId),
                password: new IamUserPassword(command.payload.password),
                isTwoFactorAuthenticationEnabled: new IamUserIsTwoFactorAuthenticationEnabled(command.payload.isTwoFactorAuthenticationEnabled),
                twoFactorAuthenticationSecret: new IamUserTwoFactorAuthenticationSecret(command.payload.twoFactorAuthenticationSecret),
                rememberToken: new IamUserRememberToken(command.payload.rememberToken),
                meta: new IamUserMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
