/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateUserCommand } from './iam-create-user.command';
import { IamCreateUserService } from './iam-create-user.service';
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
