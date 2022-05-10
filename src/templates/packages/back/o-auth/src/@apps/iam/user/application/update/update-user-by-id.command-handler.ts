/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserByIdCommand } from './update-user-by-id.command';
import { UpdateUserByIdService } from './update-user-by-id.service';
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

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdCommandHandler implements ICommandHandler<UpdateUserByIdCommand>
{
    constructor(
        private readonly updateUserByIdService: UpdateUserByIdService,
    ) {}

    async execute(command: UpdateUserByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateUserByIdService.main(
            {
                id: new UserId(command.payload.id),
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
            command.constraint,
            command.cQMetadata,
        );
    }
}