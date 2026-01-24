/* eslint-disable key-spacing */
import { IamUpdateUsersCommand } from '@app/iam/user';
import { IamUpdateUsersService } from '@app/iam/user/application/update/iam-update-users.service';
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

@CommandHandler(IamUpdateUsersCommand)
export class IamUpdateUsersCommandHandler
  implements ICommandHandler<IamUpdateUsersCommand>
{
  constructor(private readonly updateUsersService: IamUpdateUsersService) {}

  async execute(command: IamUpdateUsersCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateUsersService.main(
      {
        id: new IamUserId(command.payload.id, { undefinable: true }),
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
        twoFactorAuthenticationSecret: new IamUserTwoFactorAuthenticationSecret(
          command.payload.twoFactorAuthenticationSecret,
        ),
        rememberToken: new IamUserRememberToken(command.payload.rememberToken),
        meta: new IamUserMeta(command.payload.meta),
      },
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
