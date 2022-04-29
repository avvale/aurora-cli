/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UpdateUserService } from './update-user.service';
import {
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
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

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand>
{
    constructor(
        private readonly updateUserService: UpdateUserService,
    ) {}

    async execute(command: UpdateUserCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateUserService.main(
            {
                id: new UserId(command.payload.id),
                accountId: new UserAccountId(command.payload.accountId, { undefinable: true }),
                name: new UserName(command.payload.name, { undefinable: true }),
                surname: new UserSurname(command.payload.surname),
                avatar: new UserAvatar(command.payload.avatar),
                mobile: new UserMobile(command.payload.mobile),
                langId: new UserLangId(command.payload.langId),
                username: new UserUsername(command.payload.username, { undefinable: true }),
                password: new UserPassword(command.payload.password, { undefinable: true }),
                rememberToken: new UserRememberToken(command.payload.rememberToken),
                data: new UserData(command.payload.data),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}