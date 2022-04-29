/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { CreateUserService } from './create-user.service';
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

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand>
{
    constructor(
        private readonly createUserService: CreateUserService,
    ) {}

    async execute(command: CreateUserCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createUserService.main(
            {
                id: new UserId(command.payload.id),
                accountId: new UserAccountId(command.payload.accountId),
                name: new UserName(command.payload.name),
                surname: new UserSurname(command.payload.surname),
                avatar: new UserAvatar(command.payload.avatar),
                mobile: new UserMobile(command.payload.mobile),
                langId: new UserLangId(command.payload.langId),
                username: new UserUsername(command.payload.username),
                password: new UserPassword(command.payload.password),
                rememberToken: new UserRememberToken(command.payload.rememberToken),
                data: new UserData(command.payload.data),
            },
            command.cQMetadata,
        );
    }
}