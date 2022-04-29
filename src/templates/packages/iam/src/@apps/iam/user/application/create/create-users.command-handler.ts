/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUsersCommand } from './create-users.command';
import { CreateUsersService } from './create-users.service';
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

@CommandHandler(CreateUsersCommand)
export class CreateUsersCommandHandler implements ICommandHandler<CreateUsersCommand>
{
    constructor(
        private readonly createUsersService: CreateUsersService,
    ) {}

    async execute(command: CreateUsersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createUsersService.main(
            command.payload
                .map(user =>
                {
                    return {
                        id: new UserId(user.id),
                        accountId: new UserAccountId(user.accountId),
                        name: new UserName(user.name),
                        surname: new UserSurname(user.surname),
                        avatar: new UserAvatar(user.avatar),
                        mobile: new UserMobile(user.mobile),
                        langId: new UserLangId(user.langId),
                        username: new UserUsername(user.username),
                        password: new UserPassword(user.password),
                        rememberToken: new UserRememberToken(user.rememberToken),
                        data: new UserData(user.data),
                    };
                }),
            command.cQMetadata,
        );
    }
}