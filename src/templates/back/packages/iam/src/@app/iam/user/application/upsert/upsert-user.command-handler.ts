/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpsertUserCommand } from './upsert-user.command';
import { UpsertUserService } from './upsert-user.service';
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
    UserMeta,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpsertUserCommand)
export class UpsertUserCommandHandler implements ICommandHandler<UpsertUserCommand>
{
    constructor(
        private readonly upsertUserService: UpsertUserService,
    ) {}

    async execute(command: UpsertUserCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertUserService.main(
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
                meta: new UserMeta(command.payload.meta),
            },
            command.cQMetadata,
        );
    }
}