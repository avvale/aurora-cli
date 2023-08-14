/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpsertUserCommand } from './iam-upsert-user.command';
import { IamUpsertUserService } from './iam-upsert-user.service';
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
                username: new IamUserUsername(command.payload.username),
                password: new IamUserPassword(command.payload.password),
                rememberToken: new IamUserRememberToken(command.payload.rememberToken),
                meta: new IamUserMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}
