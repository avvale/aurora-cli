/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUsersCommand } from './update-users.command';
import { UpdateUsersService } from './update-users.service';
import {
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
    UserCode,
    UserAvatar,
    UserMobile,
    UserLangId,
    UserUsername,
    UserPassword,
    UserRememberToken,
    UserData,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateUsersCommand)
export class UpdateUsersCommandHandler implements ICommandHandler<UpdateUsersCommand>
{
    constructor(
        private readonly updateUsersService: UpdateUsersService,
    ) {}

    async execute(command: UpdateUsersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateUsersService.main(
            {
                id: new UserId(command.payload.id, { undefinable: true }),
                accountId: new UserAccountId(command.payload.accountId, { undefinable: true }),
                name: new UserName(command.payload.name, { undefinable: true }),
                surname: new UserSurname(command.payload.surname),
                code: new UserCode(command.payload.code),
                avatar: new UserAvatar(command.payload.avatar),
                mobile: new UserMobile(command.payload.mobile),
                langId: new UserLangId(command.payload.langId),
                username: new UserUsername(command.payload.username, { undefinable: true }),
                password: new UserPassword(command.payload.password, { undefinable: true }),
                rememberToken: new UserRememberToken(command.payload.rememberToken),
                data: new UserData(command.payload.data),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}