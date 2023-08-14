/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateUsersCommand } from './iam-create-users.command';
import { IamCreateUsersService } from './iam-create-users.service';
import {
    IamUserId,
    IamUserAccountId,
    IamUserName,
    IamUserSurname,
    IamUserAvatar,
    IamUserMobile,
    IamUserLangId,
    IamUserUsername,
    IamUserPassword,
    IamUserRememberToken,
    IamUserMeta,
    IamUserCreatedAt,
    IamUserUpdatedAt,
    IamUserDeletedAt,
} from '../../domain/value-objects';

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
                        username: new IamUserUsername(user.username),
                        password: new IamUserPassword(user.password, {}, { haveToEncrypt: true }),
                        rememberToken: new IamUserRememberToken(user.rememberToken),
                        meta: new IamUserMeta(user.meta),
                    };
                }),
            command.cQMetadata,
        );
    }
}
